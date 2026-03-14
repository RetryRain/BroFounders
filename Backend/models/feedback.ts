import Joi from "joi";
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    maxlength: 1000,
    trim: true,
  },

  page: {
    type: String,
    maxlength: 200,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*
Optional cleanup: delete feedback after 1 year
*/
feedbackSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 365 },
);

/*
Validation
*/
function validateFeedback(feedback: any) {
  const schema = Joi.object({
    message: Joi.string().min(3).max(2000).required(),
    page: Joi.string().max(200).optional(),
  });

  return schema.validate(feedback);
}

const Feedback = mongoose.model("Feedback", feedbackSchema);

export { Feedback, validateFeedback };
