import Task from "../models/task.model.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { getCache, setCache, deleteCache } from "../utils/cache.js";

/**
 * CREATE TASK
 */
export const createTaskService = async ({
  title,
  description,
  priority,
  assignedTo,
  dueDate,
  projectId,
  workspaceId,
  userId,
}) => {
  if (!title || !projectId || !workspaceId) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Title, projectId and workspaceId are required"
    );
  }

  const task = await Task.create({
    title,
    description,
    priority,
    assignedTo,
    dueDate,
    project: projectId,
    workspace: workspaceId,
    createdBy: userId,
  });

  await deleteCache(`workspace:${workspaceId}:tasks`);

  return task;
};

/**
 * UPDATE TASK
 */
export const updateTaskService = async ({
  taskId,
  projectId,
  workspaceId,
  updates,
}) => {
  const task = await Task.findOne({
    _id: taskId,
    project: projectId,
    workspace: workspaceId,
  });

  if (!task) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Task not found"
    );
  }

  Object.assign(task, updates);
  await task.save();

  await deleteCache(`workspace:${workspaceId}:tasks`);

  return task;
};

/**
 * DELETE TASK
 */
export const deleteTaskService = async ({
  taskId,
  workspaceId,
}) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    workspace: workspaceId,
  });

  if (!task) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Task not found"
    );
  }

  await deleteCache(`workspace:${workspaceId}:tasks`);
};

/**
 * GET ALL TASKS (WORKSPACE)
 */
export const getAllTasksService = async (workspaceId) => {
  const cacheKey = `workspace:${workspaceId}:tasks`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const tasks = await Task.find({ workspace: workspaceId })
    .sort({ createdAt: -1 });

  await setCache(cacheKey, tasks);
  return tasks;
};

/**
 * GET TASK BY ID
 */
export const getTaskByIdService = async ({
  taskId,
  projectId,
  workspaceId,
}) => {
  const task = await Task.findOne({
    _id: taskId,
    project: projectId,
    workspace: workspaceId,
  });

  if (!task) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Task not found"
    );
  }

  return task;
};
