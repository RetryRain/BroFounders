import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../models/users";
import jwt from "jsonwebtoken";

const router = express.Router();

function validateAuth(req: any) {
  const schema = Joi.object({
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(req);
}

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details?.[0]?.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  res.send(token);
});

export default router;
