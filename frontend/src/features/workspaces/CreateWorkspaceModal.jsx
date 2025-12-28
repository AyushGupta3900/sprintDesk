import React from "react";
import { useState } from "react";
import { useCreateWorkspaceMutation } from "./workspace.api";

import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function CreateWorkspaceModal({ onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createWorkspace, { isLoading }] =
    useCreateWorkspaceMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createWorkspace({ name, description }).unwrap();
    onClose();
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={null}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
              W
            </div>
            <h2 className="text-xl font-semibold">
              Create Workspace
            </h2>
          </div>

          <p className="text-sm text-white/50">
            A workspace helps you organize projects,
            tasks, and team members.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Workspace name"
            placeholder="e.g. SprintDesk Team"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <Input
            label="Description (optional)"
            placeholder="What is this workspace for?"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? "Creating..." : "Create Workspace"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
