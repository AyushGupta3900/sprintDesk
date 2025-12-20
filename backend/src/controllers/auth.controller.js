import { asyncHandler } from "../utils/async-handler.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Email and password are required",
      ErrorCodeEnum.VALIDATION_ERROR
    );
  }

  const result = await registerUser({ name, email, password });

  res.status(HTTPSTATUS.CREATED).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Email and password are required",
      ErrorCodeEnum.VALIDATION_ERROR
    );
  }

  const result = await loginUser({ email, password });

  res.status(HTTPSTATUS.OK).json(result);
});

export const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};
