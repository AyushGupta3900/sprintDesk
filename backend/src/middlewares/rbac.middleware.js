import Member from "../models/member.model.js";
import Role from "../models/role.model.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

export function rbac(requiredPermissions = []) {
  return async (req, res, next) => {
    const userId = req.user?.id;
    const workspaceId = req.user?.workspaceId;

    if (!userId || !workspaceId) {
      throw new ApiError(
        HTTPSTATUS.FORBIDDEN,
        "Workspace context missing",
        ErrorCodeEnum.ACCESS_UNAUTHORIZED
      );
    }

    const member = await Member.findOne({
      userId,
      workspaceId,
    }).populate("role");

    if (!member) {
      throw new ApiError(
        HTTPSTATUS.FORBIDDEN,
        "You are not a member of this workspace",
        ErrorCodeEnum.ACCESS_UNAUTHORIZED
      );
    }

    const role = member.role;

    const hasPermission = requiredPermissions.every((permission) =>
      role.permissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ApiError(
        HTTPSTATUS.FORBIDDEN,
        "You do not have permission to perform this action",
        ErrorCodeEnum.ACCESS_UNAUTHORIZED
      );
    }

    req.member = member;
    req.role = role;

    next();
  };
}
