import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useInviteMemberMutation } from "./workspace.api";

export default function InviteMemberModal({ onClose }) {
  const { currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");

  const [inviteMember, { isLoading, error }] =
    useInviteMemberMutation();

  const handleInvite = async (e) => {
    e.preventDefault();

    await inviteMember({
      workspaceId: currentWorkspace._id,
      email,
      role,
    }).unwrap();

    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleInvite}
        className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-lg font-semibold">
          Invite Member
        </h2>

        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>

        {error && (
          <p className="text-sm text-red-400">
            Failed to invite user
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-white/20 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-white text-black rounded-lg font-medium"
          >
            {isLoading ? "Inviting..." : "Invite"}
          </button>
        </div>
      </form>
    </div>
  );
}
