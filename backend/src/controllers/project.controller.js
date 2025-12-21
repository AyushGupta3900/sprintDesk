import { asyncHandler } from "../utils/async-handler.js";
import {
  createProjectService,
  updateProjectService,
  deleteProjectService,
  getAllProjectsInWorkspaceService,
  getProjectByIdAndWorkspaceIdService,
  getProjectAnalyticsService,
} from "../services/project.service.js";
import { HTTPSTATUS } from "../constants/http-status.js";

/**
 * CREATE PROJECT
 */
export const createProjectController = asyncHandler(
  async (req, res) => {
    const { name, description, emoji } = req.body;

    const project = await createProjectService({
      name,
      description,
      emoji,
      workspaceId: req.params.workspaceId,
      userId: req.user._id,
    });

    res.status(HTTPSTATUS.CREATED).json(project);
  }
);

/**
 * UPDATE PROJECT
 */
export const updateProjectController = asyncHandler(
  async (req, res) => {
    const project = await updateProjectService({
      projectId: req.params.id,
      workspaceId: req.params.workspaceId,
      updateData: req.body,
    });

    res.status(HTTPSTATUS.OK).json(project);
  }
);

/**
 * DELETE PROJECT
 */
export const deleteProjectController = asyncHandler(
  async (req, res) => {
    await deleteProjectService({
      projectId: req.params.id,
      workspaceId: req.params.workspaceId,
    });

    res.status(HTTPSTATUS.NO_CONTENT).send();
  }
);

/**
 * GET ALL PROJECTS IN WORKSPACE
 */
export const getAllProjectsInWorkspaceController = asyncHandler(
  async (req, res) => {
    const projects =
      await getAllProjectsInWorkspaceService(
        req.params.workspaceId
      );

    res.status(HTTPSTATUS.OK).json(projects);
  }
);

/**
 * GET PROJECT BY ID
 */
export const getProjectByIdAndWorkspaceIdController =
  asyncHandler(async (req, res) => {
    const project =
      await getProjectByIdAndWorkspaceIdService({
        projectId: req.params.id,
        workspaceId: req.params.workspaceId,
      });

    res.status(HTTPSTATUS.OK).json(project);
  });

/**
 * PROJECT ANALYTICS
 */
export const getProjectAnalyticsController = asyncHandler(
  async (req, res) => {
    const analytics =
      await getProjectAnalyticsService({
        projectId: req.params.id,
        workspaceId: req.params.workspaceId,
      });

    res.status(HTTPSTATUS.OK).json(analytics);
  }
);
