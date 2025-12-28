import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../components/ui/Button";
import Divider from "../components/ui/Divider";
import Loader from "../components/ui/Loader";
import ConfirmModal from "../components/ui/ConfirmModal";

import TaskKanban from "../features/tasks/TaskKanban";
import CreateTaskModal from "../features/tasks/CreateTaskModal";
import EditProjectModal from "../features/projects/EditProjectModal";

import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../features/projects/project.api";

import useMyWorkspaceRole from "../features/workspaces/useMyWorkspaceRole";
import { canManageMembers } from "../utils/permissions";

export default function ProjectTasksPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const role = useMyWorkspaceRole();

  const [openTask, setOpenTask] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] =
    useState(false);

  const { data: projects = [], isLoading } =
    useGetProjectsQuery(currentWorkspace?._id, {
      skip: !currentWorkspace,
    });

  const [deleteProject, { isLoading: deleting }] =
    useDeleteProjectMutation();

  const project = projects.find(
    (p) => p._id === projectId
  );

  if (!currentWorkspace || isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader text="Loading project..." />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          Project not found
        </h2>
        <p className="text-white/50">
          The project may have been deleted or you don’t have access.
        </p>

        <Button
          className="mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const handleDeleteProject = async () => {
    try {
      await deleteProject({
        projectId,
        workspaceId: currentWorkspace._id,
      }).unwrap();

      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert(
        err?.data?.message ||
          "Failed to delete project"
      );
    }
  };

  return (
    <>
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-wide text-white/40">
          Workspace · {currentWorkspace.name}
        </p>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight flex items-center gap-2">
              <span className="text-3xl">
                {project.emoji || "📁"}
              </span>
              {project.name}
            </h1>

            <p className="text-white/60">
              {project.description ||
                "No description provided for this project."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => setOpenTask(true)}
            >
              + New Task
            </Button>

            {canManageMembers(role) && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setEditOpen(true)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    setConfirmDelete(true)
                  }
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <Divider />

      <section className="pt-4">
        <TaskKanban projectId={projectId} />
      </section>

      <CreateTaskModal
        open={openTask}
        onClose={() => setOpenTask(false)}
        projectId={projectId}
      />

      <EditProjectModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        project={project}
        workspaceId={currentWorkspace._id}
      />

      <ConfirmModal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete Project"
        description="This will permanently delete the project and all its tasks. This action cannot be undone."
        confirmText="Delete Project"
        danger
        loading={deleting}
        onConfirm={handleDeleteProject}
      />
    </>
  );
}
