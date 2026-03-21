import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import routes from "./startup/routes";
import db from "./startup/db";

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BroFounders APPPPPPI is running");
});

routes(app);
db();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
