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

  const feedback = await Feedback.create({
    message: req.body.message,
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
