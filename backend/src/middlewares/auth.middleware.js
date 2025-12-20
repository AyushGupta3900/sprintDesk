import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(
      HTTPSTATUS.UNAUTHORIZED,
      "Authorization token missing",
      ErrorCodeEnum.AUTH_TOKEN_NOT_FOUND
    );
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  req.user = {
    id: decoded.userId,
    workspaceId: decoded.currentWorkspaceId,
  };

  next();
}
