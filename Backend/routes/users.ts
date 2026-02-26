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

//Get user by ID
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id as string;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid user ID.");

  const user = await User.findById(id).select("-password");

  if (!user) return res.status(404).send("User not found.");

  res.send(user);
});

//Create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
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
  if (req.body.email) updates.email = req.body.email;

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

  // User or Admin can delete
  if (loggedInUser._id.toString() !== id && !loggedInUser.isAdmin)
    return res.status(403).send("Access denied.");

  const user = await User.findByIdAndDelete(id);

  if (!user) return res.status(404).send("User not found.");

  res.status(204).send();
});

export default router;
