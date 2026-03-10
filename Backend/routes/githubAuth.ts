import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/users";

const router = express.Router();

/*
Redirect user to GitHub login
*/
router.get("/github", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;

  const redirect = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;

  res.redirect(redirect);
});

/*
GitHub callback
*/
router.get("/github/callback", async (req, res) => {
  try {
    const code = req.query.code;

    if (!code) {
      return res.redirect("http://localhost:5173/auth/login?error=github");
    }

    /*
    Exchange code for access token
    */
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      },
    );

    const accessToken = tokenRes.data.access_token;

    if (!accessToken) {
      return res.redirect("http://localhost:5173/auth/login?error=github");
    }

    /*
    Fetch GitHub user
    */
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const emailRes = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const primaryEmail =
      emailRes.data.find((e: any) => e.primary && e.verified) ||
      emailRes.data[0];

    const email = primaryEmail?.email;
    const name = userRes.data.name || userRes.data.login;

    if (!email) {
      return res.redirect("http://localhost:5173/auth/login?error=github");
    }

    /*
    Find or create user
    */
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: crypto.randomBytes(32).toString("hex"),
      });
    }

    /*
    Create JWT
    */
    const authToken = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" },
    );

    /*
    Redirect back to frontend
    */
    res.redirect(
      `http://localhost:5173/auth/github-success?token=${authToken}`,
    );
  } catch (err) {
    res.redirect("http://localhost:5173/auth/login?error=github");
  }
});

export default router;
