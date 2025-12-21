import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/task.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rbac } from "../middlewares/rbac.middleware.js";
import { Permissions } from "../enums/role.enum.js";

const taskRoutes = Router();

taskRoutes.use(authMiddleware);

/**
 * CREATE TASK
 */
taskRoutes.post(
  "/project/:projectId/workspace/:workspaceId/create",
  rbac([Permissions.CREATE_TASK]),
  createTaskController
);

/**
 * UPDATE TASK
 */
taskRoutes.put(
  "/:id/project/:projectId/workspace/:workspaceId/update",
  rbac([Permissions.EDIT_TASK]),
  updateTaskController
);

/**
 * DELETE TASK
 */
taskRoutes.delete(
  "/:id/workspace/:workspaceId/delete",
  rbac([Permissions.DELETE_TASK]),
  deleteTaskController
);

/**
 * GET ALL TASKS IN WORKSPACE
 */
taskRoutes.get(
  "/workspace/:workspaceId/all",
  rbac([Permissions.VIEW_ONLY]),
  getAllTasksController
);

/**
 * GET TASK BY ID
 */
taskRoutes.get(
  "/:id/project/:projectId/workspace/:workspaceId",
  rbac([Permissions.VIEW_ONLY]),
  getTaskByIdController
);

export default taskRoutes;
