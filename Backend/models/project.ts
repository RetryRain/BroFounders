import Joi from "joi";
import mongoose, { Query } from "mongoose";

// Schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  blurb: {
    type: String,
    required: true,
    maxlength: 300,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced", "chaos"],
  },
  goals: {
    type: [
      {
        type: String,
        maxlength: 300,
        trim: true,
      },
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000,
  },
  techStack: {
    type: [{ type: String, maxlength: 50 }],
    required: true,
  },
  lookingFor: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  maxMembers: {
    type: Number,
    required: true,
    min: 2,
    max: 50,
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "closed"],
    default: "open",
  },
  broadcast: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: {
    type: Date,
  },
});

projectSchema.pre("findOneAndDelete", async function (this: Query<any, any>) {
  const doc = await this.model.findOne(this.getFilter());

  if (doc) {
    await mongoose.model("Interest").deleteMany({
      project: doc._id,
    });
  }
});

projectSchema.index(
  { closedAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 10 }, // 10 days
);

projectSchema.index(
  {
    title: "text",
    blurb: "text",
    techStack: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      techStack: 4,
      blurb: 2,
      description: 1,
    },
  },
);

function validateProject(project: any) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(2000).required(),
    techStack: Joi.array().items(Joi.string().max(50)).min(1).required(),
    lookingFor: Joi.string().min(3).max(200).required(),
    status: Joi.string().valid("open", "in-progress", "closed").optional(),
    broadcast: Joi.string().min(3).max(300).required(),
    maxMembers: Joi.number().integer().min(1).max(50).required(),
    blurb: Joi.string().max(300).required(),
    level: Joi.string()
      .valid("beginner", "intermediate", "advanced", "chaos")
      .required(),
    goals: Joi.array().items(Joi.string().max(300)).min(1).max(4).required(),
  });

  return schema.validate(project);
}

function validateProjectUpdate(project: any) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(2000),
    techStack: Joi.array().items(Joi.string().max(50)).min(1),
    lookingFor: Joi.string().min(3).max(200),
    status: Joi.string().valid("open", "in-progress", "closed"),
    broadcast: Joi.string().min(3).max(300),
    maxMembers: Joi.number().integer().min(1).max(50),
    blurb: Joi.string().max(300),
    level: Joi.string().valid("beginner", "intermediate", "advanced", "chaos"),
    goals: Joi.array().items(Joi.string().max(300)).min(1).max(4),
  }).min(1); // at least one field required

  return schema.validate(project);
}

const Project = mongoose.model("Project", projectSchema);
export {
  Project,
  validateProject as validate,
  validateProjectUpdate as validateUpdate,
};
