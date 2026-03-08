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
  try {
    const { email } = req.body;

    if (!email) return res.status(400).send("Email required.");

    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "15m" },
      );

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

      await resend.emails.send({
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
    }

    // Always return success to avoid email enumeration
    res.send("If that email exists, a reset link was sent.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to process request.");
  }
});

/*
RESET PASSWORD
POST /auth/reset-password
*/
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) return res.status(400).send("Token missing.");

    if (!password || password.length < 6)
      return res.status(400).send("Password must be at least 6 characters.");

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const user = await User.findById(decoded._id);

    if (!user) return res.status(404).send("User not found.");

    const samePassword = await bcrypt.compare(password, user.password);

    if (samePassword) return res.status(400).send("Use a different password.");

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user.password = hashed;

    await user.save();

    res.send("Password updated successfully.");
  } catch (err) {
    res.status(400).send("Invalid or expired reset link.");
  }
});

export default router;
