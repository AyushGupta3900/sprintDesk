import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../ui/Card";
import ProjectList from "../../features/projects/ProjectList";
import CreateProjectModal from "../../features/projects/CreateProjectModal";

import useMyWorkspaceRole from "../../features/workspaces/useMyWorkspaceRole";
import { canCreateProject } from "../../utils/permissions";


const WORKSPACE_COLORS = [
  "bg-indigo-600",
  "bg-emerald-600",
  "bg-sky-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-violet-600",
  "bg-teal-600",
  "bg-cyan-600",
];

function getWorkspaceColor(id = "") {
  if (!id) return "bg-gray-600";

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return WORKSPACE_COLORS[Math.abs(hash) % WORKSPACE_COLORS.length];
}

function getInitials(name = "") {
  if (!name) return "W";

  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0]?.toUpperCase() || "W";
  return (
    (words[0][0]?.toUpperCase() || "") +
    (words[1][0]?.toUpperCase() || "")
  );
}


export default function Sidebar() {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const role = useMyWorkspaceRole();
  const [openProjectModal, setOpenProjectModal] = useState(false);

  if (!currentWorkspace) {
    return (
      <aside
        className="
          w-72 shrink-0
          bg-black
          border-r border-white/10
          h-[calc(100vh-64px)]
          px-4 py-5
          flex items-center justify-center
          text-center
          text-white/50
          text-sm
        "
      >
        <div className="space-y-3">
          <p className="font-medium text-white">
            No workspace yet
          </p>
          <p className="text-xs">
            Create a workspace to start managing projects
          </p>
        </div>
      </aside>
    );
  }

  const color = getWorkspaceColor(currentWorkspace._id);

  return (
    <>
      <aside
        className="
          w-72 shrink-0
          bg-black
          border-r border-white/10
          h-[calc(100vh-64px)]
          px-4 py-5
          flex flex-col
          gap-6
        "
      >
        <Card className="flex items-center gap-3 bg-white/5 shrink-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white ${color}`}
          >
            {getInitials(currentWorkspace.name)}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] uppercase text-white/40">
              Workspace
            </p>
            <p className="font-semibold truncate">
              {currentWorkspace.name}
            </p>
          </div>
        </Card>

        <nav className="space-y-1 text-sm shrink-0">
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/tasks">Tasks</NavItem>
          <NavItem to="/members">Members</NavItem>
          <NavItem to="/settings">Settings</NavItem>
        </nav>

        <div className="border-t border-white/10 pt-4 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between px-1 shrink-0">
            <p className="text-xs uppercase text-white/40">
              Projects
            </p>

            {role && canCreateProject(role) && (
              <button
                type="button"
                onClick={() => setOpenProjectModal(true)}
                className="
                  text-xs font-semibold
                  text-white/70
                  hover:text-white
                  hover:underline
                "
              >
                + New
              </button>
            )}
          </div>

          <div className="mt-2 flex-1 overflow-y-auto pr-1">
            <ProjectList compact />
          </div>
        </div>
      </aside>

      {openProjectModal && (
        <CreateProjectModal
          workspaceId={currentWorkspace._id}
          onClose={() => setOpenProjectModal(false)}
        />
      )}
    </>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        block px-3 py-2 rounded-lg transition
        ${
          isActive
            ? "bg-white text-black font-medium"
            : "text-white/70 hover:bg-white/10"
        }
      `
      }
    >
      {children}
    </NavLink>
  );
}
