import { Router } from "express";
import {
  create,
  listByProject,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rbac } from "../middlewares/rbac.middleware.js";
import { Permissions } from "../enums/role.enum.js";

const router = Router();

router.use(authMiddleware);

// Create task
router.post(
  "/",
  rbac([Permissions.CREATE_TASK]),
  create
);

// List tasks by project
router.get(
  "/:projectId",
  rbac([Permissions.VIEW_ONLY]),
  listByProject
);

export default router;
