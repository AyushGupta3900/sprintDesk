import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";
import Badge from "../../components/ui/Badge";

import { useCreateTaskMutation } from "./task.api";
import { useGetWorkspaceMembersQuery } from "../workspaces/workspace.api";

const PRIORITIES = [
  { label: "Low", value: "LOW", color: "bg-emerald-500/15 text-emerald-400" },
  { label: "Medium", value: "MEDIUM", color: "bg-amber-500/15 text-amber-400" },
  { label: "High", value: "HIGH", color: "bg-rose-500/15 text-rose-400" },
];

export default function CreateTaskModal({ open, onClose, projectId }) {
  const { currentWorkspace } = useSelector((state) => state.workspace);

  const { data: members = [] } =
    useGetWorkspaceMembersQuery(currentWorkspace?._id, {
      skip: !currentWorkspace,
    });

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setAssignedTo("");
    setDueDate("");
    setError(null);
  };

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  if (!open || !currentWorkspace || !projectId) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      await createTask({
        workspaceId: currentWorkspace._id,
        projectId,
        data: {
          title: title.trim(),
          description: description || undefined,
          priority,
          assignedTo: assignedTo || undefined,
          dueDate: dueDate || undefined,
        },
      }).unwrap();

      resetForm();
      onClose();
    } catch (err) {
      setError(err?.data?.message || "Failed to create task");
    }
  };

  const priorityMeta =
    PRIORITIES.find((p) => p.value === priority) ||
    PRIORITIES[1];

  return (
    <Modal open={open} onClose={onClose} title="Create Task">
      <form onSubmit={handleSubmit} className="space-y-6">

        <Input
          label="Task title"
          placeholder="e.g. Design login screen"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />

        <Input
          label="Description"
          placeholder="Optional details about the task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <div className="space-y-1">
          <label className="block text-sm text-white/60">
            Priority
          </label>

          <div className="flex items-center gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>

            <Badge className={priorityMeta.color}>
              {priorityMeta.label}
            </Badge>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm text-white/60">
            Assign to
          </label>

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
          >
            <option value="">Unassigned</option>
            {members.map((m) => (
              <option key={m._id} value={m.userId?._id}>
                {m.userId?.name || m.userId?.email}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Due date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        <Divider />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={isLoading}
            disabled={!title.trim() || isLoading}
          >
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
