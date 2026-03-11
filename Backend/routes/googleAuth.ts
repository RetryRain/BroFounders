import express from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/users";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();

    if (!payload) return res.status(400).send("Google authentication failed.");
    if (!payload.email_verified)
      return res.status(400).send("Google email not verified.");

    const email = payload.email!;
    const name = payload.name || "Google User";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: crypto.randomBytes(32).toString("hex"),
      });
    }

    const authToken = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: "6h" },
    );

    res.send({
      token: authToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch {
    res.status(400).send("Google login failed.");
  }
});

export default router;
