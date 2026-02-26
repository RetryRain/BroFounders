import express from "express";
import project from "../routes/projects";
import users from "../routes/users";
import auth from "../routes/auth";
import interests from "../routes/interest";
import error from "../middleware/error";

export default function (app: express.Application) {
  app.use(express.json());

  app.use("/projects", project);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/interests", interests);

  app.use(error); // error middleware last
}
