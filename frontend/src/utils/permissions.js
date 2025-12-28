export const ROLE = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
};

export const canInvite = (role) =>
  role === ROLE.OWNER || role === ROLE.ADMIN;

export const canManageMembers = (role) =>
  role === ROLE.OWNER;

export const canCreateProject = (role) =>
  role === ROLE.OWNER || role === ROLE.ADMIN;

export const canDeleteProject = (role) =>
  role === ROLE.OWNER;