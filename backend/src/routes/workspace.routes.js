import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rbac } from "../middlewares/rbac.middleware.js";
import { Permissions } from "../enums/role.enum.js";
import {
  createWorkspace,
  getMyWorkspaces,
  getCurrentWorkspace,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
  getWorkspaceMembers,
  updateMemberRole,
  removeMember,
  getWorkspaceById,
  getWorkspaceAnalytics,
} from "../controllers/workspace.controller.js";

const router = Router();

router.use(authMiddleware);

/* ===============================
   COLLECTION LEVEL
================================ */
router.get("/", getMyWorkspaces);
router.get("/current", getCurrentWorkspace);
router.post("/", createWorkspace);

/* ===============================
   WORKSPACE-SPECIFIC (STATIC FIRST)
================================ */
router.get(
  "/:workspaceId/analytics",
  rbac([Permissions.VIEW_ONLY]),
  getWorkspaceAnalytics
);

router.get(
  "/:workspaceId/members",
  rbac([Permissions.VIEW_ONLY]),
  getWorkspaceMembers
);

router.post(
  "/:workspaceId/invite",
  rbac([Permissions.ADD_MEMBER]),
  inviteMember
);

router.patch(
  "/:workspaceId/members/:memberId",
  rbac([Permissions.CHANGE_MEMBER_ROLE]),
  updateMemberRole
);

router.delete(
  "/:workspaceId/members/:memberId",
  rbac([Permissions.REMOVE_MEMBER]),
  removeMember
);

/* ===============================
   WORKSPACE CRUD
================================ */
router.put(
  "/:workspaceId",
  rbac([Permissions.EDIT_WORKSPACE]),
  updateWorkspace
);

router.delete(
  "/:workspaceId",
  rbac([Permissions.DELETE_WORKSPACE]),
  deleteWorkspace
);

/* ===============================
   ⚠️ GENERIC ROUTE LAST
================================ */
router.get(
  "/:workspaceId",
  rbac([Permissions.VIEW_ONLY]),
  getWorkspaceById
);

export default router;
