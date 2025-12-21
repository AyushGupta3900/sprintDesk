import { Router } from "express";
import {
  createProjectController,
  updateProjectController,
  deleteProjectController,
  getAllProjectsInWorkspaceController,
  getProjectAnalyticsController,
  getProjectByIdAndWorkspaceIdController,
} from "../controllers/project.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rbac } from "../middlewares/rbac.middleware.js";
import { Permissions } from "../enums/role.enum.js";

const projectRoutes = Router();

projectRoutes.use(authMiddleware);

/**
 * CREATE PROJECT
 */
projectRoutes.post(
  "/workspace/:workspaceId/create",
  rbac([Permissions.CREATE_PROJECT]),
  createProjectController
);

/**
 * UPDATE PROJECT
 */
projectRoutes.put(
  "/:id/workspace/:workspaceId/update",
  rbac([Permissions.EDIT_PROJECT]),
  updateProjectController
);

/**
 * DELETE PROJECT
 */
projectRoutes.delete(
  "/:id/workspace/:workspaceId/delete",
  rbac([Permissions.DELETE_PROJECT]),
  deleteProjectController
);

/**
 * GET ALL PROJECTS IN WORKSPACE
 */
projectRoutes.get(
  "/workspace/:workspaceId/all",
  rbac([Permissions.VIEW_ONLY]),
  getAllProjectsInWorkspaceController
);

/**
 * PROJECT ANALYTICS
 */
projectRoutes.get(
  "/:id/workspace/:workspaceId/analytics",
  rbac([Permissions.VIEW_ONLY]),
  getProjectAnalyticsController
);

/**
 * GET PROJECT BY ID
 */
projectRoutes.get(
  "/:id/workspace/:workspaceId",
  rbac([Permissions.VIEW_ONLY]),
  getProjectByIdAndWorkspaceIdController
);

export default projectRoutes;
