import rateLimit from "express-rate-limit";
import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export const strictAuthRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(HTTPSTATUS.TOO_MANY_REQUESTS).json({
      errorCode: ErrorCodeEnum.AUTH_TOO_MANY_ATTEMPTS,
      message: "Too many attempts, please try again later",
    });
  },
});
