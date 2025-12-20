import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

export class ApiError extends Error {
  constructor(
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    message = "Something went wrong",
    errorCode = ErrorCodeEnum.INTERNAL_SERVER_ERROR
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}