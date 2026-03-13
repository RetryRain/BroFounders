import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import { Interest, validate } from "../models/interest";
import { Project } from "../models/project";

const router = express.Router();

/*
==============================
Submit interest to a project
POST /interests/:projectId
==============================
*/
router.post("/:projectId", auth, async (req, res) => {
  const projectId = req.params.projectId as string;

  if (!mongoose.Types.ObjectId.isValid(projectId))
    return res.status(400).send("Invalid project ID.");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).send("Project not found.");

  if (project.status !== "open")
    return res.status(400).send("Project is not accepting members.");

  const loggedInUser = (req as any).user;

  if (project.user.toString() === loggedInUser._id)
    return res.status(400).send("You cannot join your own project.");

  try {
    const interest = await Interest.create({
      project: projectId,
      user: loggedInUser._id,
      message: req.body.message,
    });

    res.status(201).send(await interest.populate("user", "name"));
  } catch (err: any) {
    if (err.code === 11000)
      return res.status(400).send("You already requested to join.");

    res.status(500).send("Something failed.");
  }
});

/*
==============================
My interests (projects I applied to)
GET /interests/me
==============================
*/
router.get("/me", auth, async (req, res) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const loggedInUser = (req as any).user;

  const filter = { user: loggedInUser._id };

  const interests = await Interest.find(filter)
    .populate("project", "title status")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const filtered = interests.filter((i) => i.project);

  res.send({
    total: filtered.length,
    page,
    pages: Math.ceil(filtered.length / limit),
    data: filtered,
  });
});

/*
==============================
Get interests for a project
GET /interests/project/:projectId
==============================
*/
router.get("/project/:projectId", auth, async (req, res) => {
  const projectId = req.params.projectId as string;

  if (!mongoose.Types.ObjectId.isValid(projectId))
    return res.status(400).send("Invalid project ID.");

  const project = await Project.findById(projectId).select("user");
  if (!project) return res.status(404).send("Project not found.");

  const loggedInUser = (req as any).user;

  if (
    project.user.toString() !== loggedInUser._id.toString() &&
    !loggedInUser.isAdmin
  )
    return res.status(403).send("Access denied.");

  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const statusFilter = req.query.status as string | undefined;

  const filter: any = { project: projectId };

  if (
    statusFilter &&
    ["pending", "accepted", "rejected"].includes(statusFilter)
  ) {
    filter.status = statusFilter;
  }

  const [interests, total] = await Promise.all([
    Interest.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Interest.countDocuments(filter),
  ]);

  res.send({
    total,
    page,
    pages: Math.ceil(total / limit),
    data: interests,
  });
});

/*
==============================
Interests received for my projects
GET /interests/received/me
==============================
*/
router.get("/received/me", auth, async (req, res) => {
  const loggedInUser = (req as any).user;

  const myProjects = await Project.find({ user: loggedInUser._id }).select(
    "_id",
  );

  const projectIds = myProjects.map((p) => p._id);

  const interests = await Interest.find({
    project: { $in: projectIds },
  })
    .populate("user", "name email")
    .populate("project", "title status")
    .sort({ createdAt: -1 });

  const filtered = interests.filter((i) => i.project);

  res.send(filtered);
});

/*
==============================
Accepted projects (teams I joined)
GET /interests/accepted/me
==============================
*/
router.get("/accepted/me", auth, async (req, res) => {
  const loggedInUser = (req as any).user;

  const interests = await Interest.find({
    user: loggedInUser._id,
    status: "accepted",
  })
    .populate("project")
    .sort({ createdAt: -1 });

  res.send(interests.filter((i) => i.project));
});

/*
==============================
Respond to interest
PATCH /interests/:interestId
==============================
*/
router.patch("/:interestId", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const interestId = req.params.interestId as string;

    if (!mongoose.Types.ObjectId.isValid(interestId))
      return res.status(400).send("Invalid interest ID.");

    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status))
      return res.status(400).send("Invalid status.");

    const interest = await Interest.findById(interestId)
      .session(session)
      .populate("project");

    if (!interest) {
      await session.abortTransaction();
      return res.status(404).send("Interest not found.");
    }

    if (!interest.project) {
      await session.abortTransaction();
      return res.status(400).send("Project no longer exists.");
    }

    const loggedInUser = (req as any).user;
    const project = interest.project as any;

    if (
      project.user.toString() !== loggedInUser._id.toString() &&
      !loggedInUser.isAdmin
    ) {
      await session.abortTransaction();
      return res.status(403).send("Access denied.");
    }

    if (status === "accepted") {
      if (project.status === "closed") throw new Error("Project is closed.");

      if (
        project.members.some(
          (m: any) => m.toString() === interest.user.toString(),
        )
      )
        throw new Error("User already added.");

      if (project.members.length >= project.maxMembers)
        throw new Error("Team is full.");

      project.members.push(interest.user);

      /*
      Team reached capacity → start project
      */
      if (project.members.length === project.maxMembers) {
        const now = new Date();

        project.status = "in-progress";
        project.startedAt = now;

        // schedule automatic close in 40 days
        project.closeAt = new Date(now.getTime() + 40 * 24 * 60 * 60 * 1000);
      }

      await project.save({ session });
    }

    interest.status = status;

    await interest.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.send(interest);
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).send(err.message || "Transaction failed.");
  }
});

export default router;
