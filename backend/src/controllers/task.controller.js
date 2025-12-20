import { asyncHandler } from "../utils/async-handler.js";
import {
  createTask,
  getTasksByProject,
} from "../services/task.service.js";
import { HTTPSTATUS } from "../constants/http-status.js";

/**
 * POST /api/tasks
 */
export const create = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    projectId,
    priority,
    assignedTo,
    dueDate,
  } = req.body;

  const task = await createTask({
    title,
    description,
    projectId,
    workspaceId: req.user.workspaceId,
    userId: req.user.id,
    priority,
    assignedTo,
    dueDate,
  });

  res.status(HTTPSTATUS.CREATED).json(task);
});

/**
 * GET /api/tasks/:projectId
 */
export const listByProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const tasks = await getTasksByProject(
    projectId,
    req.user.workspaceId
  );

  res.status(HTTPSTATUS.OK).json(tasks);
});
