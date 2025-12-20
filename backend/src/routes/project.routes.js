import { Router } from "express";
import { create, list } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rbac } from "../middlewares/rbac.middleware.js";
import { Permissions } from "../enums/role.enum.js";

const router = Router();

router.use(authMiddleware);

// Create project
router.post(
  "/",
  rbac([Permissions.CREATE_PROJECT]),
  create
);

// List projects
router.get(
  "/",
  rbac([Permissions.CREATE_PROJECT, Permissions.VIEW_ONLY]),
  list
);

export default router;
