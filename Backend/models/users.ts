import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function validateUser(user: any) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

function validateUserUpdate(user: any) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().min(5).max(1024),
  }).min(1); // at least one field required

  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

export { User, validateUser as validate, validateUserUpdate as validateUpdate };
