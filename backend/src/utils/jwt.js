import jwt from "jsonwebtoken";
import { ApiError } from "./api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

export function signToken(payload, options = {}) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    ...options,
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(
      HTTPSTATUS.UNAUTHORIZED,
      "Invalid or expired token",
      ErrorCodeEnum.AUTH_INVALID_TOKEN
    );
  }
}