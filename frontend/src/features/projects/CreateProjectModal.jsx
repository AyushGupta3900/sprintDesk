import React, { useState } from "react";
import { useCreateProjectMutation } from "./project.api";

import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function CreateProjectModal({
  workspaceId,
  onClose,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("📁");

  const [
    createProject,
    { isLoading, error },
  ] = useCreateProjectMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createProject({
        workspaceId,
        name,
        description,
        emoji,
      }).unwrap();

      onClose(); 
    } catch (err) {
      console.error("Create project failed", err);
    }
  };

  return (
    <Modal open onClose={onClose} title="Create Project">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs text-white/60 mb-1">
            Icon
          </label>
          <input
            type="text"
            maxLength={2}
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="
              w-16 text-center text-xl
              bg-white/10 border border-white/10
              rounded-lg py-2
              focus:outline-none focus:ring-2 focus:ring-white/30
            "
          />
        </div>

        <div>
          <label className="block text-xs text-white/60 mb-1">
            Project name
          </label>
          <Input
            placeholder="e.g. Sprint Planning"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs text-white/60 mb-1">
            Description (optional)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Short description"
            className="
              w-full rounded-lg
              bg-white/10 border border-white/10
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-white/30
            "
          />
        </div>

        {error && (
          <div className="text-sm text-red-400">
            Failed to create project
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Creating..."
              : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
