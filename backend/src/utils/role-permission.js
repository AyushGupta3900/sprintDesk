import { Roles, Permissions } from "../enums/role.enum.js";

export const RolePermissions = {
  [Roles.OWNER]: Object.values(Permissions),

  [Roles.ADMIN]: [
    Permissions.EDIT_WORKSPACE,
    Permissions.ADD_MEMBER,
    Permissions.CHANGE_MEMBER_ROLE,
    Permissions.REMOVE_MEMBER,
    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,
  ],

  [Roles.MEMBER]: [
    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.VIEW_ONLY,
  ],
};
