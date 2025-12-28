import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";
import { useUpdateProjectMutation } from "./project.api";

export default function EditProjectModal({
  open,
  onClose,
  project,
  workspaceId,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");

  const [updateProject, { isLoading }] =
    useUpdateProjectMutation();

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setDescription(project.description || "");
      setEmoji(project.emoji || "");
    }
  }, [project]);

  if (!open || !project) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProject({
      projectId: project._id,
      workspaceId,
      data: { name, description, emoji },
    }).unwrap();

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Project"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <Input
          label="Emoji"
          placeholder="📁"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />

        <Divider />

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={isLoading} type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
