import User from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

export async function registerUser({ name, email, password }) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      HTTPSTATUS.CONFLICT,
      "Email already registered",
      ErrorCodeEnum.AUTH_EMAIL_ALREADY_EXISTS
    );
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = signToken({
    userId: user._id,
    currentWorkspaceId: null,
  });

  return {
    user: user.omitPassword(),
    token,
  };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(
      HTTPSTATUS.UNAUTHORIZED,
      "Invalid email or password",
      ErrorCodeEnum.AUTH_USER_NOT_FOUND
    );
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(
      HTTPSTATUS.UNAUTHORIZED,
      "Invalid email or password",
      ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
    );
  }

  const token = signToken({
    userId: user._id,
    currentWorkspaceId: user.currentWorkspace,
  });

  user.lastLogin = new Date();
  await user.save();

  return {
    user: user.omitPassword(),
    token,
  };
}
