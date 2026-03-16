import express from "express";
import mongoose from "mongoose";
import { Project, validate, validateUpdate } from "../models/project";
import auth from "../middleware/auth";

const router = express.Router();

/*
==============================
Get all (paginated)
==============================
*/
router.get("/", auth, async (req, res) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const search = (req.query.search as string)?.trim() || "";
  const status = req.query.status as string;

  let filter: any = {};
  let sort: any = { createdAt: -1 };
  let projection: any = {};

  /* ---------------- Status Filter ---------------- */

  if (status && ["open", "in-progress", "closed"].includes(status)) {
    filter.status = status;
  }

  /* ---------------- Search Filter ---------------- */

  if (search) {
    if (mongoose.Types.ObjectId.isValid(search)) {
      filter._id = search;
    } else {
      filter.$text = { $search: search };
      sort = { score: { $meta: "textScore" } };
      projection = { score: { $meta: "textScore" } };
    }
  }

  const [projects, total] = await Promise.all([
    Project.find(filter, projection)
      .select("-broadcast")
      .populate("user", "name")
      .populate("members", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Project.countDocuments(filter),
  ]);

  /* ---------------- Auto close expired projects ---------------- */

  const now = new Date();

  for (const project of projects) {
    if (
      project.status === "in-progress" &&
      project.closeAt &&
      project.closeAt <= now
    ) {
      await Project.findByIdAndUpdate(project._id, {
        status: "closed",
        closedAt: now,
      });

      project.status = "closed";
    }
  }

  res.send({
    total,
    page,
    pages: Math.ceil(total / limit),
    data: projects,
  });
});
/*
==============================
Get my projects
==============================
*/
router.get("/me", auth, async (req, res) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const search = (req.query.search as string) || "";
  const user = (req as any).user;

  const filter: any = { user: user._id };

  if (search) {
    filter.$text = { $search: search };
  }

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate("user", "name")
      .populate("members", "name")
      .select(search ? { score: { $meta: "textScore" } } : {})
      .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Project.countDocuments(filter),
  ]);

  res.send({
    total,
    page,
    pages: Math.ceil(total / limit),
    data: projects,
  });
});

/*
==============================
Get my teams
==============================
*/
router.get("/my-teams", auth, async (req, res) => {
  const user = (req as any).user;

  const projects = await Project.find({
    members: user._id,
  })
    .populate("user", "name")
    .populate("members", "name")
    .sort({ createdAt: -1 });

  res.send(projects);
});

/*
==============================
Get project by ID
==============================
*/
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid project ID.");

  const project = await Project.findById(id)
    .populate("user", "name")
    .populate("members", "name")
    .lean();

  if (!project) return res.status(404).send("Project not found");

  const user = (req as any).user;

  const isMember = project.members.some(
    (member: any) => member._id.toString() === user._id.toString(),
  );

  if (!isMember) project.broadcast = "";

  res.send(project);
});

/*
==============================
Create project
==============================
*/
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const user = (req as any).user;

  const openProjectsCount = await Project.countDocuments({
    user: user._id,
    status: "open",
  });

  if (openProjectsCount >= 5) {
    return res
      .status(400)
      .send("You can only have a maximum of 5 open projects.");
  }

  const { members, ...safeBody } = req.body;

  const project = await Project.create({
    ...safeBody,
    user: user._id,
    members: [user._id],
  });

  const populated = await Project.findById(project._id)
    .populate("user", "name")
    .populate("members", "name");

  res.status(201).send(populated);
});

/*
==============================
Update project
==============================
*/
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid project ID.");

  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const loggedInUser = (req as any).user;

  const project = await Project.findById(id);

  if (!project) return res.status(404).send("Project not found.");

  if (!loggedInUser.isAdmin && project.user.toString() !== loggedInUser._id)
    return res.status(403).send("Access denied.");

  /*
  Prevent shrinking team size
  */

  if (req.body.maxMembers && req.body.maxMembers < project.members.length) {
    return res
      .status(400)
      .send("Max members cannot be lower than current team size.");
  }

  const updateData: any = { ...req.body };

  /*
  Reopen project if capacity increased
  */

  if (
    req.body.maxMembers &&
    req.body.maxMembers > project.maxMembers &&
    project.status === "in-progress"
  ) {
    updateData.status = "open";
    updateData.startedAt = null;
    updateData.closeAt = null;
  }

  /*
  Manual closing
  */

  if (req.body.status === "closed") {
    updateData.closedAt = new Date();

    await mongoose.model("Interest").deleteMany({
      project: id,
      status: "pending",
    });
  }

  if (req.body.status && req.body.status !== "closed") {
    updateData.closedAt = null;
  }

  const updated = await Project.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  })
    .populate("user", "name")
    .populate("members", "name");

  res.send(updated);
});

/*
==============================
Delete project
==============================
*/
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid project ID.");

  const loggedInUser = (req as any).user;

  const filter = loggedInUser.isAdmin
    ? { _id: id }
    : { _id: id, user: loggedInUser._id };

  const project = await Project.findOneAndDelete(filter);

  if (!project)
    return res.status(404).send("Project not found or access denied.");

  res.status(204).send();
});

export default router;
