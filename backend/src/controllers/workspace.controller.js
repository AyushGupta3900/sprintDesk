import { asyncHandler } from "../utils/async-handler.js";
import { createWorkspace } from "../services/workspace.service.js";
import { HTTPSTATUS } from "../constants/http-status.js";

export const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const workspace = await createWorkspace({
    name,
    description,
    userId: req.user.id,
  });

  res.status(HTTPSTATUS.CREATED).json(workspace);
});
