import { asyncHandler } from "../utils/async-handler.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from "../services/task.service.js";

/**
 * CREATE TASK
 */
export const createTaskController = asyncHandler(async (req, res) => {
  const { title, description, priority, assignedTo, dueDate } = req.body;
  const { projectId, workspaceId } = req.params;

  const task = await createTaskService({
    title,
    description,
    priority,
    assignedTo,
    dueDate,
    projectId,
    workspaceId,
    userId: req.user._id,
  });

  res.status(HTTPSTATUS.CREATED).json(task);
});

/**
 * UPDATE TASK
 */
export const updateTaskController = asyncHandler(async (req, res) => {
  const { id, projectId, workspaceId } = req.params;
  const updates = req.body;

  const task = await updateTaskService({
    taskId: id,
    projectId,
    workspaceId,
    updates,
  });

  res.status(HTTPSTATUS.OK).json(task);
});

/**
 * DELETE TASK
 */
export const deleteTaskController = asyncHandler(async (req, res) => {
  const { id, workspaceId } = req.params;

  await deleteTaskService({
    taskId: id,
    workspaceId,
  });

  res.status(HTTPSTATUS.NO_CONTENT).send();
});

/**
 * GET ALL TASKS
 */
export const getAllTasksController = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;

  const tasks = await getAllTasksService(workspaceId);
  res.status(HTTPSTATUS.OK).json(tasks);
});

/**
 * GET TASK BY ID
 */
export const getTaskByIdController = asyncHandler(async (req, res) => {
  const { id, projectId, workspaceId } = req.params;

  const task = await getTaskByIdService({
    taskId: id,
    projectId,
    workspaceId,
  });

  res.status(HTTPSTATUS.OK).json(task);
});
