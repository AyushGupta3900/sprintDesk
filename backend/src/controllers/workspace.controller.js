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
  getWorkspaceAnalyticsService
} from "../services/workspace.service.js";

import { HTTPSTATUS } from "../constants/http-status.js";

export const createWorkspace = async (req, res) => {
  const workspace = await createWorkspaceService({
    name: req.body.name,
    description: req.body.description,
    userId: req.user._id,
  });

  res.status(HTTPSTATUS.CREATED).json(workspace);
};

export const getMyWorkspaces = async (req, res) => {
  const workspaces = await getUserWorkspacesService(req.user._id);
  res.status(HTTPSTATUS.OK).json(workspaces);
};

export const getCurrentWorkspace = async (req, res) => {
  const workspace = await getCurrentWorkspaceService(req.user);
  res.status(HTTPSTATUS.OK).json(workspace);
};

export const updateWorkspace = async (req, res) => {
  const workspace = await updateWorkspaceService({
    workspaceId: req.params.workspaceId,
    name: req.body.name,
    description: req.body.description,
  });

  res.status(HTTPSTATUS.OK).json(workspace);
};

export const deleteWorkspace = async (req, res) => {
  await deleteWorkspaceService(req.params.workspaceId);
  res.status(HTTPSTATUS.NO_CONTENT).send();
};

export const inviteMember = async (req, res) => {
  const member = await inviteMemberService({
    workspaceId: req.params.workspaceId,
    email: req.body.email,
    role: req.body.role,
  });

  res.status(HTTPSTATUS.CREATED).json(member);
};

export const getWorkspaceMembers = async (req, res) => {
  const members = await getWorkspaceMembersService(req.params.workspaceId);
  res.status(HTTPSTATUS.OK).json(members);
};

export const updateMemberRole = async (req, res) => {
  const member = await updateMemberRoleService({
    workspaceId: req.params.workspaceId,
    memberId: req.params.memberId,
    role: req.body.role,
  });

  res.status(HTTPSTATUS.OK).json(member);
};

export const removeMember = async (req, res) => {
  await removeMemberService({
    workspaceId: req.params.workspaceId,
    memberId: req.params.memberId,
  });

  res.status(HTTPSTATUS.NO_CONTENT).send();
};

/**
 * GET /api/workspaces/:workspaceId
 * Workspace detail with members & roles
 */
export const getWorkspaceById = async (req, res) => {
  const data = await getWorkspaceByIdService(
    req.params.workspaceId
  );

  res.status(HTTPSTATUS.OK).json(data);
};

/**
 * GET /api/workspaces/:workspaceId/analytics
 * Workspace dashboard analytics
 */
export const getWorkspaceAnalytics = async (req, res) => {
  const analytics = await getWorkspaceAnalyticsService(
    req.params.workspaceId
  );

  res.status(HTTPSTATUS.OK).json(analytics);
};
