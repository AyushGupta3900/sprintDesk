import Task from "../models/task.model.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { getCache, setCache, deleteCache } from "../utils/cache.js";
import { getIO } from "../sockets/index.js";

/**
 * Create a task
 */
export async function createTask({
  title,
  description,
  projectId,
  workspaceId,
  userId,
  priority,
  assignedTo,
  dueDate,
}) {
  if (!title || !projectId) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Title and project are required"
    );
  }

  const task = await Task.create({
    title,
    description,
    project: projectId,
    workspace: workspaceId,
    priority,
    assignedTo,
    dueDate,
    createdBy: userId,
  });

  await deleteCache(
    `workspace:${workspaceId}:project:${projectId}:tasks`
  );

  getIO()
  .to(`workspace:${workspaceId}`)
  .emit("task:created", task);

  return task;
}


/**
 * Get tasks by project
 */
export async function getTasksByProject(projectId, workspaceId) {
  const cacheKey = `workspace:${workspaceId}:project:${projectId}:tasks`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const tasks = await Task.find({
    project: projectId,
    workspace: workspaceId,
  }).sort({ createdAt: -1 });

  await setCache(cacheKey, tasks);
  return tasks;
}
