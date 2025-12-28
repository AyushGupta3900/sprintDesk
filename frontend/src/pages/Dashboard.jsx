import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTasksByWorkspaceQuery } from "../features/tasks/task.api";

import WorkspaceAnalytics from "../components/ui/WorkspaceAnalytics";
import RecentData from "../components/ui/RecentData";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";

import CreateProjectModal from "../features/projects/CreateProjectModal";
import useMyWorkspaceRole from "../features/workspaces/useMyWorkspaceRole";
import { canCreateProject } from "../utils/permissions";

export default function HomePage() {
  const { currentWorkspace } = useSelector((state) => state.workspace);
  const role = useMyWorkspaceRole();
  const [openProjectModal, setOpenProjectModal] = useState(false);

  const {
    data: tasks = [],
    isLoading,
  } = useGetTasksByWorkspaceQuery(currentWorkspace?._id, {
    skip: !currentWorkspace,
  });

  if (!currentWorkspace) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">
            No workspace yet
          </h1>
          <p className="text-white/50 text-sm max-w-sm">
            Create a workspace to start managing projects and tasks.
          </p>
        </div>
      </div>
    );
  }

  if (!role || isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader text="Loading dashboard..." />
      </div>
    );
  }

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt) - new Date(a.updatedAt)
    )
    .slice(0, 5);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Workspace Dashboard
          </h1>
          <p className="text-sm text-white/50">
            Workspace · {currentWorkspace.name}
          </p>
        </div>

        {canCreateProject(role) && (
          <Button onClick={() => setOpenProjectModal(true)}>
            + New Project
          </Button>
        )}
      </div>

      <WorkspaceAnalytics tasks={tasks} />

      <div className="mt-8">
        <RecentData recentTasks={recentTasks} />
      </div>

      {openProjectModal && (
        <CreateProjectModal
          workspaceId={currentWorkspace._id}
          onClose={() => setOpenProjectModal(false)}
        />
      )}
    </>
  );
}
