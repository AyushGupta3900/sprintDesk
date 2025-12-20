import Workspace from "../models/workspace.model.js";
import Role from "../models/role.model.js";
import Member from "../models/member.model.js";
import User from "../models/user.model.js";

import { Roles } from "../enums/role.enum.js";
import { RolePermissions } from "../utils/role-permission.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";

// Create workspace with default roles and owner membership
export async function createWorkspace({ name, description, userId }) {
  if (!name) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Workspace name is required"
    );
  }

  // 1️⃣ Create workspace
  const workspace = await Workspace.create({
    name,
    description,
    owner: userId,
  });

  // 2️⃣ Create default roles
  const roles = await Role.insertMany(
    Object.values(Roles).map((roleName) => ({
      name: roleName,
      permissions: RolePermissions[roleName],
      workspaceId: workspace._id,
    }))
  );

  // 3️⃣ Find OWNER role
  const ownerRole = roles.find((r) => r.name === Roles.OWNER);

  // 4️⃣ Create member entry
  await Member.create({
    userId,
    workspaceId: workspace._id,
    role: ownerRole._id,
  });

  // 5️⃣ Update user context
  await User.findByIdAndUpdate(userId, {
    currentWorkspace: workspace._id,
  });

  return workspace;
}
