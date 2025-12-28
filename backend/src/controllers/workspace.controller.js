import { asyncHandler } from "../utils/async-handler.js";
import { HTTPSTATUS } from "../constants/http-status.js";

import {
  createWorkspaceService,
  getUserWorkspacesService,
  getCurrentWorkspaceService,
  updateWorkspaceService,
  deleteWorkspaceService,
  inviteMemberService,
  getWorkspaceMembersService,
  updateMemberRoleService,
  removeMemberService,
  getWorkspaceByIdService,
  getWorkspaceAnalyticsService,
} from "../services/workspace.service.js";

/**
 * CREATE WORKSPACE
 */
export const createWorkspace = asyncHandler(async (req, res) => {
  const workspace = await createWorkspaceService({
    name: req.body.name,
    description: req.body.description,
    userId: req.user._id,
  });

  res.status(HTTPSTATUS.CREATED).json(workspace);
});

/**
 * GET MY WORKSPACES
 */
export const getMyWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await getUserWorkspacesService(req.user._id);
  res.status(HTTPSTATUS.OK).json(workspaces);
});

/**
 * GET CURRENT WORKSPACE
 */
export const getCurrentWorkspace = asyncHandler(async (req, res) => {
  const workspace = await getCurrentWorkspaceService(req.user);
  res.status(HTTPSTATUS.OK).json(workspace);
});

/**
 * UPDATE WORKSPACE
 */
export const updateWorkspace = asyncHandler(async (req, res) => {
  const workspace = await updateWorkspaceService({
    workspaceId: req.params.workspaceId,
    name: req.body.name,
    description: req.body.description,
  });

  res.status(HTTPSTATUS.OK).json(workspace);
});

/**
 * DELETE WORKSPACE
 */
export const deleteWorkspace = asyncHandler(async (req, res) => {
  await deleteWorkspaceService(req.params.workspaceId);
  res.status(HTTPSTATUS.NO_CONTENT).send();
});

/**
 * INVITE MEMBER
 */
export const inviteMember = asyncHandler(async (req, res) => {
  const member = await inviteMemberService({
    workspaceId: req.params.workspaceId,
    email: req.body.email,
    role: req.body.role,
  });

  res.status(HTTPSTATUS.CREATED).json(member);
});

/**
 * GET WORKSPACE MEMBERS
 */
export const getWorkspaceMembers = asyncHandler(async (req, res) => {
  const members = await getWorkspaceMembersService(req.params.workspaceId);
  res.status(HTTPSTATUS.OK).json(members);
});

/**
 * UPDATE MEMBER ROLE
 */
export const updateMemberRole = asyncHandler(async (req, res) => {
  const member = await updateMemberRoleService({
    workspaceId: req.params.workspaceId,
    memberId: req.params.memberId,
    role: req.body.role,
  });

  res.status(HTTPSTATUS.OK).json(member);
});

/**
 * REMOVE MEMBER
 */
export const removeMember = asyncHandler(async (req, res) => {
  await removeMemberService({
    workspaceId: req.params.workspaceId,
    memberId: req.params.memberId,
  });

  res.status(HTTPSTATUS.NO_CONTENT).send();
});

/**
 * GET WORKSPACE BY ID
 * Workspace detail with members & roles
 */
export const getWorkspaceById = asyncHandler(async (req, res) => {
  const data = await getWorkspaceByIdService(req.params.workspaceId);
  res.status(HTTPSTATUS.OK).json(data);
});

/**
 * GET WORKSPACE ANALYTICS
 * Workspace dashboard analytics
 */
export const getWorkspaceAnalytics = asyncHandler(async (req, res) => {
  const analytics = await getWorkspaceAnalyticsService(
    req.params.workspaceId
  );

  res.status(HTTPSTATUS.OK).json(analytics);
});
