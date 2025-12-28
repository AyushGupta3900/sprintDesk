import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";

import {
  useGetTasksByWorkspaceQuery,
  useUpdateTaskStatusMutation,
} from "./task.api";

import TaskColumn from "./TaskColumn";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

const STATUS_MAP = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

export default function TaskKanban({ projectId }) {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const workspaceId = currentWorkspace?._id;

  const {
    data: tasks = [],
    isLoading,
  } = useGetTasksByWorkspaceQuery(workspaceId, {
    skip: !workspaceId,
  });

  const [updateTaskStatus] =
    useUpdateTaskStatusMutation();

  if (!workspaceId) return null;

  if (isLoading) {
    return (
      <div className="py-20">
        <Loader text="Loading tasks…" />
      </div>
    );
  }

  const visibleTasks = projectId
    ? tasks.filter((t) => t.project === projectId)
    : tasks;

  if (visibleTasks.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Create your first task to start tracking work."
      />
    );
  }

  const groupedTasks = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  for (const task of visibleTasks) {
    if (groupedTasks[task.status]) {
      groupedTasks[task.status].push(task);
    }
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = visibleTasks.find(
      (t) => String(t._id) === String(draggableId)
    );

    if (!draggedTask || !draggedTask.project) {
      console.error(
        "Drag failed: missing projectId",
        draggedTask
      );
      return;
    }

    updateTaskStatus({
      workspaceId,
      taskId: draggableId,
      status: destination.droppableId,
      projectId: draggedTask.project, 
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {Object.entries(STATUS_MAP).map(
          ([status, title]) => (
            <TaskColumn
              key={status}
              status={status}
              title={title}
              tasks={groupedTasks[status]}
            />
          )
        )}
      </div>
    </DragDropContext>
  );
}
