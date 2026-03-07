import express from "express";
import cors from "cors";
import project from "../routes/projects";
import users from "../routes/users";
import auth from "../routes/auth";
import interests from "../routes/interest";
import error from "../middleware/error";
import passwordReset from "../routes/passwordReset";

export default function (app: express.Application) {
  app.use(
    cors({
      origin: "http://localhost:5173", // your frontend
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use("/projects", project);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/interests", interests);
  app.use("/auth", passwordReset);

  app.use(error); // error middleware last
}
