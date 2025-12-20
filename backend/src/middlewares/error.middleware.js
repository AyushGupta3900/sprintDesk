import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { ApiError } from "../utils/api-error.js";

export function errorMiddleware(err, req, res, next) {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(
      HTTPSTATUS.INTERNAL_SERVER_ERROR,
      error.message || "Internal Server Error",
      ErrorCodeEnum.INTERNAL_SERVER_ERROR
    );
  }

  const response = {
    errorCode: error.errorCode,
    message: error.message,
  };

  // Log only in non-test env
  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  res.status(error.statusCode).json(response);
}