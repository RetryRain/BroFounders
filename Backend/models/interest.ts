import Joi from "joi";
import mongoose from "mongoose";

const interestSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*
Prevent duplicate interest from same user for same project
*/
interestSchema.index({ project: 1, user: 1 }, { unique: true });

/*
Auto delete interests after 30 days
*/
interestSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 },
);

/*
Validation
*/
function validateInterest(body: any) {
  const schema = Joi.object({
    message: Joi.string().min(5).max(1000).required(),
  });

  return schema.validate(body);
}

const Interest = mongoose.model("Interest", interestSchema);

export { Interest, validateInterest as validate };
