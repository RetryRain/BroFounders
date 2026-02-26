import express from "express";
import mongoose from "mongoose";
import { Project, validate, validateUpdate } from "../models/project";
import auth from "../middleware/auth";

const router = express.Router();

// Get all (paginated)
router.get("/", async (req, res) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  // max 50 per request to prevent abuse

  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find()
      .select("-broadcast")
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Project.countDocuments(),
  ]);

  res.send({
    total,
    page,
    pages: Math.ceil(total / limit),
    data: projects,
  });
});

// Get my projects (paginated)
router.get("/me", auth, async (req, res) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);

  const skip = (page - 1) * limit;

  const user = (req as any).user;

  const [projects, total] = await Promise.all([
    Project.find({ user: user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Project.countDocuments({ user: user._id }),
  ]);

  res.send({
    total,
    page,
    pages: Math.ceil(total / limit),
    data: projects,
  });
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

  if (openProjectsCount >= 10) {
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
