import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";

import Card from "../../components/ui/Card";
import ConfirmModal from "../../components/ui/ConfirmModal";
import EditTaskModal from "./EditTaskModal";
import TaskAssignee from "./TaskAssignee";
import { useDeleteTaskMutation } from "./task.api";

const PRIORITY_STYLES = {
  LOW: "bg-green-500/20 text-green-400 border border-green-500/30",
  MEDIUM: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  HIGH: "bg-red-500/20 text-red-400 border border-red-500/30",
};

export default function TaskCard({ task, index }) {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] =
    useState(false);

  const [deleteTask, { isLoading }] =
    useDeleteTaskMutation();

  const handleDelete = async () => {
    await deleteTask({
      workspaceId: currentWorkspace._id,
      taskId: task._id,
    }).unwrap();

    setConfirmDelete(false);
  };

  const priorityClass =
    PRIORITY_STYLES[task.priority] ||
    "bg-white/10 text-white/60 border border-white/20";

  return (
    <>
      <Draggable
        draggableId={String(task._id)}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card className="space-y-3 cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-white/20 transition">
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-sm font-medium">
                  {task.title}
                </h4>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${priorityClass}`}
                >
                  {task.priority || "—"}
                </span>
              </div>

              {task.description && (
                <p className="text-xs text-white/60 line-clamp-2">
                  {task.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                {task.dueDate && (
                  <span className="text-[11px] text-white/50">
                    📅{" "}
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </span>
                )}

                <TaskAssignee task={task} />
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => setEditOpen(true)}
                  className="text-xs text-white/60 hover:text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    setConfirmDelete(true)
                  }
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </Card>
          </div>
        )}
      </Draggable>

      <EditTaskModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        task={task}
      />

      <ConfirmModal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete Task"
        description="This task will be permanently deleted."
        confirmText="Delete"
        danger
        loading={isLoading}
        onConfirm={handleDelete}
      />
    </>
  );
}
