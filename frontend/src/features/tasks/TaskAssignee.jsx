import React from "react";
import { useSelector } from "react-redux";
import { useGetWorkspaceMembersQuery } from "../workspaces/workspace.api";
import { useAssignTaskMutation } from "./task.api";

export default function TaskAssignee({ task }) {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const { data: members = [], isLoading } =
    useGetWorkspaceMembersQuery(currentWorkspace?._id, {
      skip: !currentWorkspace,
    });

  const [assignTask] = useAssignTaskMutation();

  if (isLoading || !currentWorkspace) return null;

  const handleChange = (e) => {
    assignTask({
      workspaceId: currentWorkspace._id,
      projectId: task.project,
      taskId: task._id,
      userId: e.target.value || null,
    });
  };

  return (
    <select
      value={task.assignedTo || ""}
      onChange={handleChange}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm"
    >
      <option value="">Unassigned</option>

      {members.map((member) => (
        <option
          key={member._id}
          value={member.userId._id}
        >
          {member.userId.name || member.userId.email}
        </option>
      ))}
    </select>
  );
}
