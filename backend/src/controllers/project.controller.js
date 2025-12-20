import { asyncHandler } from "../utils/async-handler.js";
import {
  createProject,
  getProjects,
} from "../services/project.service.js";
import { HTTPSTATUS } from "../constants/http-status.js";

/**
 * POST /api/projects
 */
export const create = asyncHandler(async (req, res) => {
  const { name, description, emoji } = req.body;

  const project = await createProject({
    name,
    description,
    emoji,
    workspaceId: req.user.workspaceId,
    userId: req.user.id,
  });

  res.status(HTTPSTATUS.CREATED).json(project);
});

/**
 * GET /api/projects
 */
export const list = asyncHandler(async (req, res) => {
  const projects = await getProjects(req.user.workspaceId);

  res.status(HTTPSTATUS.OK).json(projects);
});
