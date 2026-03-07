import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/users";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

/*
SEND RESET EMAIL
POST /auth/forgot-password
*/
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).send("User not found.");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const response = await resend.emails.send({
    from: "Project Hub <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password.</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
  console.log(response);
  res.send("Password reset email sent.");
});

/*
RESET PASSWORD
POST /auth/reset-password
*/
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(decoded._id, {
      password: hashed,
    });

    res.send("Password updated.");
  } catch {
    res.status(400).send("Invalid or expired token.");
  }
});

export default router;
