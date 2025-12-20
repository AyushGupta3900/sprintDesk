import Project from "../models/project.model.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import { getCache, setCache, deleteCache } from "../utils/cache.js";
import { getIO } from "../sockets/index.js";

export async function createProject({
  name,
  description,
  emoji,
  workspaceId,
  userId,
}) {
  if (!name) {
    throw new ApiError(
      HTTPSTATUS.BAD_REQUEST,
      "Project name is required"
    );
  }

  const project = await Project.create({
    name,
    description,
    emoji,
    workspace: workspaceId,
    createdBy: userId,
  });

  await deleteCache(`workspace:${workspaceId}:projects`);
  getIO().to(`workspace:${workspaceId}`).emit("project:created", project);

  return project;
}

export async function getProjects(workspaceId) {
  const cacheKey = `workspace:${workspaceId}:projects`;

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const projects = await Project.find({ workspace: workspaceId }).sort({
    createdAt: -1,
  });

  await setCache(cacheKey, projects);
  return projects;
}
