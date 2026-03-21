import rateLimit from "express-rate-limit";

export const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many signup attempts. Try later.",
});
