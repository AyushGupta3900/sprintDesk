import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import { useGetTasksByWorkspaceQuery } from "./task.api";

export default function TaskList({ onCreate }) {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const { data: tasks = [], isLoading } =
    useGetTasksByWorkspaceQuery(currentWorkspace?._id, {
      skip: !currentWorkspace,
    });

  if (!currentWorkspace || isLoading) return null;

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Create tasks to start executing your projects."
        action={onCreate}
      />
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task._id}>
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{task.title}</h3>
            <Badge>{task.status || "todo"}</Badge>
          </div>

          {task.priority && (
            <p className="text-sm text-white/50 mt-1">
              Priority: {task.priority}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
