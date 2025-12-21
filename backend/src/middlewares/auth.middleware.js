import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

export const authMiddleware = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        HTTPSTATUS.UNAUTHORIZED,
        "Authorization token missing",
        ErrorCodeEnum.AUTH_TOKEN_NOT_FOUND
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId).select(
      "_id email name currentWorkspace"
    );

    if (!user) {
      throw new ApiError(
        HTTPSTATUS.UNAUTHORIZED,
        "User not found",
        ErrorCodeEnum.AUTH_USER_NOT_FOUND
      );
    }

    req.user = {
      _id: user._id,
      email: user.email,
      name: user.name,
      currentWorkspace: user.currentWorkspace,
    };

    next();
  } catch (err) {
    next(err);
  }
};
