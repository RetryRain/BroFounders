import express from "express";
import auth from "../middleware/auth";
import { Feedback, validateFeedback } from "../models/feedback";

const router = express.Router();

/*
==============================
Submit feedback
POST /feedback
==============================
*/
router.post("/", auth, async (req, res) => {
  const { error } = validateFeedback(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const loggedInUser = (req as any).user;

  /*
  ==============================
  Rate limit: 1 feedback / hour
  ==============================
  */
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const recentFeedback = await Feedback.findOne({
    user: loggedInUser._id,
    createdAt: { $gte: oneHourAgo },
  });

  if (recentFeedback) return res.status(429).send("Please try again later");

  /*
  ==============================
  Prevent duplicate spam
  ==============================
  */
  const duplicate = await Feedback.findOne({
    user: loggedInUser._id,
    message: req.body.message.trim(),
  });

  if (duplicate)
    return res.status(400).send("You've already submitted this feedback.");

  /*
  ==============================
  Create feedback
  ==============================
  */
  const feedback = await Feedback.create({
    message: req.body.message.trim(),
    page: req.body.page,
    user: loggedInUser._id,
  });

  res.status(201).send(feedback);
});

/*
==============================
Get feedback (admin)
GET /feedback
==============================
*/
router.get("/", auth, async (req, res) => {
  const feedback = await Feedback.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(200);

  res.send(feedback);
});

export default router;
