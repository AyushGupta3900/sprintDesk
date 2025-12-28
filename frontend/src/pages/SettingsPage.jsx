import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import Badge from "../components/ui/Badge";

import useMyWorkspaceRole from "../features/workspaces/useMyWorkspaceRole";
import { canManageMembers } from "../utils/permissions";

import {
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
} from "../features/workspaces/workspace.api";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { currentWorkspace } = useSelector((state) => state.workspace);
  const role = useMyWorkspaceRole();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);

  const [updateWorkspace, { isLoading: saving }] =
    useUpdateWorkspaceMutation();
  const [deleteWorkspace, { isLoading: deleting }] =
    useDeleteWorkspaceMutation();

  useEffect(() => {
    if (currentWorkspace) {
      setName(currentWorkspace.name || "");
      setDescription(currentWorkspace.description || "");
    }
  }, [currentWorkspace]);

  if (!currentWorkspace) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader text="Loading settings..." />
      </div>
    );
  }

  const canEdit = canManageMembers(role);

  const isDirty = useMemo(() => {
    return (
      name !== currentWorkspace.name ||
      description !== (currentWorkspace.description || "")
    );
  }, [name, description, currentWorkspace]);

  const handleSave = async () => {
    setStatus(null);
    try {
      await updateWorkspace({
        workspaceId: currentWorkspace._id,
        data: { name, description },
      }).unwrap();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Delete "${currentWorkspace.name}"?\nThis cannot be undone.`
      )
    )
      return;

    await deleteWorkspace(currentWorkspace._id).unwrap();
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-sm text-white/50">
          Manage configuration and permissions
        </p>
      </div>

      <Card className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">General</h2>
          <Badge>{role}</Badge>
        </div>

        <Input
          label="Workspace name"
          value={name}
          disabled={!canEdit}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Description"
          value={description}
          disabled={!canEdit}
          onChange={(e) => setDescription(e.target.value)}
        />

        {status === "success" && (
          <p className="text-sm text-emerald-400">
            Workspace updated successfully
          </p>
        )}

        {status === "error" && (
          <p className="text-sm text-red-400">
            Failed to update workspace
          </p>
        )}

        {canEdit && (
          <Button
            onClick={handleSave}
            disabled={!isDirty || saving}
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        )}
      </Card>

      {canEdit && (
        <Card className="border border-red-500/30 bg-red-500/5 space-y-4">
          <h2 className="font-semibold text-red-400">
            Danger Zone
          </h2>

          <p className="text-sm text-red-300">
            Deleting a workspace removes all projects, tasks, and members.
          </p>

          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete workspace"}
          </Button>
        </Card>
      )}
    </>
  );
}
