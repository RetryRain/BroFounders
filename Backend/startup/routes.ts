import express from "express";
import cors from "cors";
import project from "../routes/projects";
import users from "../routes/users";
import auth from "../routes/auth";
import googleAuth from "../routes/googleAuth";
import githubAuth from "../routes/githubAuth";
import interests from "../routes/interest";
import feedbackRoutes from "../routes/feedback";
import error from "../middleware/error";
import passwordReset from "../routes/passwordReset";

export default function (app: express.Application) {
  const FRONTEND_URL = process.env.FRONTEND_URL;

  app.use(
    cors({
      origin: FRONTEND_URL, // wired from .env
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use("/projects", project);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/interests", interests);
  app.use("/feedback", feedbackRoutes);
  app.use("/auth", passwordReset);

  app.use("/auth", googleAuth);
  app.use("/auth", githubAuth);

  app.use(error); // error middleware last
}
