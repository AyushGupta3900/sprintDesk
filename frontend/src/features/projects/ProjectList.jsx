import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import { useGetProjectsQuery } from "./project.api";

export default function ProjectList({ compact = false }) {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const { data: projects = [], isLoading } =
    useGetProjectsQuery(currentWorkspace?._id, {
      skip: !currentWorkspace,
    });

  if (!currentWorkspace || isLoading) return null;

  if (projects.length === 0) {
    return (
      <EmptyState
        compact
        title="No projects"
        description="Create a project to get started"
      />
    );
  }

  return (
    <div className="space-y-1">
      {projects.map((project) => {
        const isActive = project._id === projectId;

        return (
          <button
            key={project._id}
            onClick={() =>
              navigate(`/projects/${project._id}/tasks`)
            }
            className={`
              w-full text-left
              px-3 py-2 rounded-lg
              flex items-center gap-2
              transition
              ${
                isActive
                  ? "bg-white text-black font-medium"
                  : "text-white/70 hover:bg-white/10"
              }
            `}
          >
            <span className="shrink-0 text-sm">
              {project.emoji || "📁"}
            </span>

            <span
              className="truncate text-sm"
              title={project.name}
            >
              {project.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
