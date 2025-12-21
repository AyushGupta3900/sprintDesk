import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import { ApiError } from "../utils/api-error.js";
import { HTTPSTATUS } from "../constants/http-status.js";
import {
  getCache,
  setCache,
  deleteCache,
} from "../utils/cache.js";
import { getIO } from "../sockets/index.js";

/**
 * CREATE PROJECT
 */
export const createProjectService = async ({
  name,
  description,
  emoji,
  workspaceId,
  userId,
}) => {
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

  getIO()
    .to(`workspace:${workspaceId}`)
    .emit("project:created", project);

  return project;
};

/**
 * UPDATE PROJECT
 */
export const updateProjectService = async ({
  projectId,
  workspaceId,
  updateData,
}) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, workspace: workspaceId },
    updateData,
    { new: true }
  );

  if (!project) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Project not found"
    );
  }

  await deleteCache(`workspace:${workspaceId}:projects`);

  getIO()
    .to(`workspace:${workspaceId}`)
    .emit("project:updated", project);

  return project;
};

/**
 * DELETE PROJECT
 */
export const deleteProjectService = async ({
  projectId,
  workspaceId,
}) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    workspace: workspaceId,
  });

  if (!project) {
    throw new ApiError(
      HTTPSTATUS.NOT_FOUND,
      "Project not found"
    );
  }

  await deleteCache(`workspace:${workspaceId}:projects`);

  getIO()
    .to(`workspace:${workspaceId}`)
    .emit("project:deleted", projectId);
};

/**
 * GET ALL PROJECTS IN WORKSPACE
 */
export const getAllProjectsInWorkspaceService =
  async (workspaceId) => {
    const cacheKey = `workspace:${workspaceId}:projects`;

    const cached = await getCache(cacheKey);
    if (cached) return cached;

    const projects = await Project.find({
      workspace: workspaceId,
    }).sort({ createdAt: -1 });

    await setCache(cacheKey, projects);

    return projects;
  };

/**
 * GET PROJECT BY ID
 */
export const getProjectByIdAndWorkspaceIdService =
  async ({ projectId, workspaceId }) => {
    const project = await Project.findOne({
      _id: projectId,
      workspace: workspaceId,
    });

    if (!project) {
      throw new ApiError(
        HTTPSTATUS.NOT_FOUND,
        "Project not found"
      );
    }

    return project;
  };

/**
 * PROJECT ANALYTICS
 */
export const getProjectAnalyticsService = async ({
  projectId,
  workspaceId,
}) => {
  const totalTasks = await Task.countDocuments({
    project: projectId,
    workspace: workspaceId,
  });

  const completedTasks = await Task.countDocuments({
    project: projectId,
    workspace: workspaceId,
    status: "DONE",
  });

  return {
    totalTasks,
    completedTasks,
    progress:
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks / totalTasks) * 100
          ),
  };
};
