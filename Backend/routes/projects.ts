import express from "express";
import mongoose from "mongoose";
import { Project, validate, validateUpdate } from "../models/project";
import auth from "../middleware/auth";

const router = express.Router();

// Get all (paginated)
router.get("/", async (req, res) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const search = (req.query.search as string)?.trim() || "";

  let filter: any = {};
  let sort: any = { createdAt: -1 };
  let projection: any = {};

  if (search) {
    if (mongoose.Types.ObjectId.isValid(search)) {
      filter = { _id: search };
    } else {
      filter = { $text: { $search: search } };
      sort = { score: { $meta: "textScore" } };
      projection = { score: { $meta: "textScore" } };
    }
  }

  const [projects, total] = await Promise.all([
    Project.find(filter, projection)
      .select("-broadcast")
      .populate("user", "name")
      .sort(sort)
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

// Get my projects (paginated + search)
router.get("/me", auth, async (req, res) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const search = (req.query.search as string) || "";
  const user = (req as any).user;

  // Base filter (only my projects)
  const filter: any = { user: user._id };

  // Add text search if provided
  if (search) {
    filter.$text = { $search: search };
  }

  const [projects, total] = await Promise.all([
    Project.find(filter)
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

// Get projects created by me
router.get("/my-teams", auth, async (req, res) => {
  const user = (req as any).user;

  const projects = await Project.find({
    members: user._id,
  }).sort({ createdAt: -1 });

  res.send(projects);
});

// Get by ID
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid project ID.");

  const project = await Project.findById(id).populate("user", "name").lean();

  if (!project) return res.status(404).send("Project not found");

  const user = (req as any).user;

  const isMember = project.members.some(
    (member: any) => member.toString() === user._id.toString(),
  );

  if (!isMember) project.broadcast = "";

  res.send(project);
});

// Create
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const user = (req as any).user;

  // Count open projects of this user
  const openProjectsCount = await Project.countDocuments({
    user: user._id,
    status: "open",
  });

  if (openProjectsCount >= 5) {
    return res
      .status(400)
      .send("You can only have a maximum of 10 open projects.");
  }

  const { members, ...safeBody } = req.body;

  const project = await Project.create({
    ...safeBody,
    user: user._id,
    members: [user._id],
  });
  res.status(201).send(await project.populate("user", "name"));
});

// Update
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid project ID.");

  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const loggedInUser = (req as any).user;

  const filter = loggedInUser.isAdmin
    ? { _id: id }
    : { _id: id, user: loggedInUser._id, status: "open" };

  //  handle closing logic
  const updateData = { ...req.body };
  if (req.body.status === "closed") {
    updateData.closedAt = new Date();

    await mongoose.model("Interest").deleteMany({
      project: id,
      status: "pending",
    });
  }

  // handle reopening (optional safety)
  if (req.body.status && req.body.status !== "closed") {
    updateData.closedAt = null;
  }

  const project = await Project.findOneAndUpdate(filter, updateData, {
    new: true,
  });

  if (!project)
    return res.status(404).send("Project not found or access denied.");

  res.send(project);
});

// Delete
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
