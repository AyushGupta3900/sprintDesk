import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { useGetWorkspacesQuery } from "./workspace.api";

export default function WorkspaceList() {
  const { data, isLoading } = useGetWorkspacesQuery();

  if (isLoading) return null;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No workspaces yet"
        description="Create a workspace to start managing projects."
        action={<Button>Create Workspace</Button>}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((ws) => (
        <Card key={ws._id}>
          <h3 className="text-lg font-semibold">{ws.name}</h3>
          <p className="text-white/50 text-sm mt-1">
            {ws.description || "No description"}
          </p>
        </Card>
      ))}
    </div>
  );
}
