import express from "express";
import jwt from "jsonwebtoken";
import { User, validate, validateUpdate } from "../models/users";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

const router = express.Router();

//Get all users
router.get("/", auth, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

// Get currently logged-in user
router.get("/me", auth, async (req, res) => {
  const userId = (req as any).user._id;

  const user = await User.findById(userId).select("-password");

  if (!user) return res.status(404).send("User not found.");

  res.send(user);
});

//Get user by ID
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid user ID.");

  const user = await User.findById(id).select("-password -email");

  if (!user) return res.status(404).send("User not found.");

  res.send(user);
});

//Create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const { name, email, password } = req.body;

  // Password validation
  if (!password || password.length < 5)
    return res.status(400).send("Password must be at least 5 characters long.");

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  res.status(201).send({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// Update user
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid user ID.");

  const loggedInUser = (req as any).user;

  //User or Admin can update
  if (loggedInUser._id.toString() !== id && !loggedInUser.isAdmin)
    return res.status(403).send("Access denied.");

  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const updates: any = {};

  if (req.body.name) updates.name = req.body.name;

  if (req.body.email) return res.status(400).send("Email cannot be changed.");

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findByIdAndUpdate(id, updates, { new: true }).select(
    "-password",
  );

  if (!user) return res.status(404).send("User not found.");

  res.send(user);
});

//Delete user
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid user ID.");

  const loggedInUser = (req as any).user;

  if (loggedInUser._id.toString() !== id && !loggedInUser.isAdmin)
    return res.status(403).send("Access denied.");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findByIdAndDelete(id).session(session);

    if (!user) {
      await session.abortTransaction();
      return res.status(404).send("User not found.");
    }

    const Project = mongoose.model("Project");
    const Interest = mongoose.model("Interest");

    // find projects created by user
    const projects = await Project.find({ user: id })
      .select("_id")
      .session(session);

    const projectIds = projects.map((p) => p._id);

    // delete interests related to those projects
    await Interest.deleteMany({ project: { $in: projectIds } }).session(
      session,
    );

    // delete projects created by user
    await Project.deleteMany({ user: id }).session(session);

    // remove user from project members
    await Project.updateMany(
      { members: id },
      { $pull: { members: id } },
    ).session(session);

    // delete interests created by user
    await Interest.deleteMany({ user: id }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(204).send();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).send("Failed to delete user.");
  }
});

export default router;
