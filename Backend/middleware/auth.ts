import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Session expired, please login.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (ex: any) {
    if (ex.name === "TokenExpiredError")
      return res.status(401).send("Session expired.");
    return res.status(400).send("Invalid token.");
  }
}
