import { Request, Response, NextFunction } from "express";

export default function error(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("🔥 Error:", err);
  res.status(500).send("Something failed.");
}
