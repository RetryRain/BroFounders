import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./startup/routes";
import db from "./startup/db";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HalfAss API running");
});

routes(app);
db();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
