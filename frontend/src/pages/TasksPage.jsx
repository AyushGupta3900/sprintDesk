import React from "react";
import { useSelector } from "react-redux";

import TaskKanban from "../features/tasks/TaskKanban";
import Loader from "../components/ui/Loader";

export default function TasksPage() {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  if (!currentWorkspace) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader text="Loading tasks..." />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Tasks
          </h1>
          <p className="text-sm text-white/50">
            Workspace · {currentWorkspace.name}
          </p>
        </div>

        <span className="text-sm text-white/40">
          Drag & drop to update status
        </span>
      </div>

      <TaskKanban />
    </>
  );
}
