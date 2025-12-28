import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";

import { useUpdateTaskMutation } from "./task.api";

const PRIORITIES = ["LOW", "MEDIUM", "HIGH"];

export default function EditTaskModal({ open, onClose, task }) {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const [updateTask, { isLoading }] =
    useUpdateTaskMutation();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority || "MEDIUM");
    }
  }, [task]);

  if (!open || !task || !currentWorkspace) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateTask({
      workspaceId: currentWorkspace._id,
      projectId: task.project,
      taskId: task._id,
      data: {
        title,
        description,
        priority,
      },
    }).unwrap();

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <div>
          <label className="text-sm text-white/60">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <Divider />

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
