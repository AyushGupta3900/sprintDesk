import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";

import InviteMemberModal from "../features/workspaces/InviteMemberModal";
import useMyWorkspaceRole from "../features/workspaces/useMyWorkspaceRole";
import { canInvite, canManageMembers } from "../utils/permissions";

import {
  useGetWorkspaceMembersQuery,
  useUpdateMemberRoleMutation,
  useRemoveMemberMutation,
} from "../features/workspaces/workspace.api";

export default function MembersPage() {
  const { currentWorkspace } = useSelector((state) => state.workspace);
  const role = useMyWorkspaceRole();
  const [inviteOpen, setInviteOpen] = useState(false);

  const { data: members = [], isLoading } =
    useGetWorkspaceMembersQuery(currentWorkspace?._id, {
      skip: !currentWorkspace,
    });

  const [updateRole, { isLoading: updatingRole }] =
    useUpdateMemberRoleMutation();

  const [removeMember, { isLoading: removingMember }] =
    useRemoveMemberMutation();

  if (!currentWorkspace || isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader text="Loading members..." />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Members
          </h1>
          <p className="text-sm text-white/50">
            Manage workspace access
          </p>
        </div>

        {canInvite(role) && (
          <Button onClick={() => setInviteOpen(true)}>
            Invite Member
          </Button>
        )}
      </div>

      <Card className="divide-y divide-white/10">
        {members.map((member) => {
          const user = member.userId;
          const roleName = member.role?.name;
          const isOwner = roleName === "OWNER";

          return (
            <div
              key={member._id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div>
                <p className="font-medium">
                  {user.name || "Unnamed"}
                </p>
                <p className="text-sm text-white/50">
                  {user.email}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={roleName}
                  disabled={
                    !canManageMembers(role) ||
                    isOwner ||
                    updatingRole
                  }
                  onChange={(e) =>
                    updateRole({
                      workspaceId: currentWorkspace._id,
                      memberId: member._id,
                      role: e.target.value,
                    })
                  }
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm disabled:opacity-60"
                >
                  <option value="OWNER">OWNER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MEMBER">MEMBER</option>
                </select>

                {canManageMembers(role) && !isOwner && (
                  <button
                    disabled={removingMember}
                    onClick={() =>
                      removeMember({
                        workspaceId: currentWorkspace._id,
                        memberId: member._id,
                      })
                    }
                    className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </Card>

      {inviteOpen && (
        <InviteMemberModal onClose={() => setInviteOpen(false)} />
      )}
    </>
  );
}
