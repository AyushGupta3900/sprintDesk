import Workspace from "../models/workspace.model.js";
import Member from "../models/member.model.js";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

import { Roles } from "../enums/role.enum.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { ApiError } from "../utils/api-error.js";
import {
  getCache,
  setCache,
  deleteCache,
} from "../utils/cache.js";

/**
 * =====================================================
 * CREATE WORKSPACE
 * =====================================================
 */
export const createWorkspaceService = async ({
  name,
  description,
  userId,
}) => {
  if (!name) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Workspace name is required"
    );
  }

  if (!userId) {
    throw new ApiError(
      HTTPSTATUS.UNAUTHORIZED,
      "User not authenticated"
    );
  }

  const workspace = await Workspace.create({
    name,
    description,
    owner: userId,
  });

  // Seed roles
  const roles = await Role.insertMany([
    { name: Roles.OWNER, workspaceId: workspace._id },
    { name: Roles.ADMIN, workspaceId: workspace._id },
    { name: Roles.MEMBER, workspaceId: workspace._id },
  ]);

  const ownerRole = roles.find(
    (r) => r.name === Roles.OWNER
  );

  await Member.create({
    userId,
    workspaceId: workspace._id,
    role: ownerRole._id,
  });

  await User.findByIdAndUpdate(userId, {
    currentWorkspace: workspace._id,
  });

  // 🔥 Cache invalidation
  await deleteCache(`user:${userId}:workspaces`);

  return workspace;
};

/**
 * =====================================================
 * GET USER WORKSPACES (CACHED)
 * =====================================================
 */
export const getUserWorkspacesService = async (userId) => {
  if (!userId) {
    throw new ApiError(
      HTTPSTATUS.UNAUTHORIZED,
      "User not authenticated"
    );
  }

  const cacheKey = `user:${userId}:workspaces`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const members = await Member.find({ userId })
    .populate("workspaceId")
    .lean();

  const workspaces = members.map(
    (m) => m.workspaceId
  );

  await setCache(cacheKey, workspaces);

  return workspaces;
};

/**
 * =====================================================
 * GET CURRENT WORKSPACE (NO CACHE)
 * =====================================================
 */
export const getCurrentWorkspaceService = async (user) => {
  if (!user?.currentWorkspace) return null;

  const workspace = await Workspace.findById(
    user.currentWorkspace
  );

  if (!workspace) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Current workspace not found"
    );
  }

  return workspace;
};

/**
 * =====================================================
 * UPDATE WORKSPACE
 * =====================================================
 */
export const updateWorkspaceService = async ({
  workspaceId,
  name,
  description,
}) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Workspace not found"
    );
  }

  if (name) workspace.name = name;
  if (description !== undefined) {
    workspace.description = description;
  }

  await workspace.save();

  // 🔥 Invalidate related caches
  await deleteCache(
    `workspace:${workspaceId}:members`
  );

  return workspace;
};

/**
 * =====================================================
 * DELETE WORKSPACE
 * =====================================================
 */
export const deleteWorkspaceService = async (workspaceId) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Workspace not found"
    );
  }

  await Promise.all([
    Member.deleteMany({ workspaceId }),
    Role.deleteMany({ workspaceId }),
    Project.deleteMany({ workspace: workspaceId }),
    Task.deleteMany({ workspace: workspaceId }),
    Workspace.findByIdAndDelete(workspaceId),
  ]);

  await deleteCache(`workspace:${workspaceId}:members`);
};

/**
 * =====================================================
 * INVITE MEMBER
 * =====================================================
 */
export const inviteMemberService = async ({
  workspaceId,
  email,
  role,
}) => {
  if (!workspaceId || !email || !role) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "WorkspaceId, email and role are required"
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "User not found"
    );
  }

  const existingMember = await Member.findOne({
    userId: user._id,
    workspaceId,
  });

  if (existingMember) {
    throw new ApiError(
      HTTPSTATUS.CONFLICT,
      "User already a member of this workspace"
    );
  }

  const roleDoc = await Role.findOne({
    name: role,
    workspaceId,
  });

  if (!roleDoc) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Invalid role for this workspace"
    );
  }

  const member = await Member.create({
    userId: user._id,
    workspaceId,
    role: roleDoc._id,
  });

  // 🔥 Cache invalidation
  await Promise.all([
    deleteCache(
      `workspace:${workspaceId}:members`
    ),
    deleteCache(`user:${user._id}:workspaces`),
  ]);

  return member;
};

/**
 * =====================================================
 * GET WORKSPACE MEMBERS (CACHED)
 * =====================================================
 */
export const getWorkspaceMembersService = async (
  workspaceId
) => {
  const cacheKey = `workspace:${workspaceId}:members`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const members = await Member.find({ workspaceId })
    .populate("userId", "name email profilePicture")
    .populate("role", "name")
    .lean();

  await setCache(cacheKey, members);

  return members;
};

/**
 * =====================================================
 * UPDATE MEMBER ROLE
 * =====================================================
 */
export const updateMemberRoleService = async ({
  workspaceId,
  memberId,
  role,
}) => {
  const roleDoc = await Role.findOne({
    name: role,
    workspaceId,
  });

  if (!roleDoc) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Invalid role"
    );
  }

  const member = await Member.findOneAndUpdate(
    { _id: memberId, workspaceId },
    { role: roleDoc._id },
    { new: true }
  );

  if (!member) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Member not found"
    );
  }

  // 🔥 Invalidate members cache
  await deleteCache(
    `workspace:${workspaceId}:members`
  );

  return member;
};

/**
 * =====================================================
 * REMOVE MEMBER
 * =====================================================
 */
export const removeMemberService = async ({
  workspaceId,
  memberId,
}) => {
  const member = await Member.findOneAndDelete({
    _id: memberId,
    workspaceId,
  });

  if (!member) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Member not found"
    );
  }

  // 🔥 Invalidate caches
  await Promise.all([
    deleteCache(
      `workspace:${workspaceId}:members`
    ),
    deleteCache(`user:${member.userId}:workspaces`),
  ]);
};

/**
 * =====================================================
 * GET WORKSPACE BY ID (DETAIL PAGE)
 * =====================================================
 */
export const getWorkspaceByIdService = async (workspaceId) => {
  if (!workspaceId) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Workspace ID is required"
    );
  }

  const workspace = await Workspace.findById(workspaceId).lean();

  if (!workspace) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Workspace not found"
    );
  }

  const [members, roles] = await Promise.all([
    Member.find({ workspaceId })
      .populate("userId", "name email profilePicture")
      .populate("role", "name")
      .lean(),

    Role.find({ workspaceId })
      .select("name permissions")
      .lean(),
  ]);

  return {
    workspace,
    members,
    roles,
  };
};

/**
 * =====================================================
 * WORKSPACE ANALYTICS (DASHBOARD)
 * =====================================================
 */
export const getWorkspaceAnalyticsService = async (workspaceId) => {
  if (!workspaceId) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Workspace ID is required"
    );
  }

  const now = new Date();

  const [
    totalTasks,
    completedTasks,
    overdueTasks,
  ] = await Promise.all([
    Task.countDocuments({ workspace: workspaceId }),

    Task.countDocuments({
      workspace: workspaceId,
      status: "DONE",
    }),

    Task.countDocuments({
      workspace: workspaceId,
      dueDate: { $lt: now },
      status: { $ne: "DONE" },
    }),
  ]);

  return {
    totalTasks,
    completedTasks,
    overdueTasks,
  };
};
