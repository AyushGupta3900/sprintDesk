import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetWorkspacesQuery } from "./workspace.api";
import { setCurrentWorkspace } from "./workspace.slice";
import Card from "../../components/ui/Card";

const WORKSPACE_COLORS = [
  "bg-indigo-600",
  "bg-emerald-600",
  "bg-sky-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-violet-600",
  "bg-teal-600",
  "bg-cyan-600",
];

function getWorkspaceColor(id = "") {
  if (!id) return "bg-gray-600";
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return WORKSPACE_COLORS[Math.abs(hash) % WORKSPACE_COLORS.length];
}

function getInitials(name = "") {
  if (!name) return "W";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0]?.toUpperCase() || "W";
  return (
    (words[0][0]?.toUpperCase() || "") +
    (words[1][0]?.toUpperCase() || "")
  );
}

export default function WorkspaceSwitcher({ onCreateWorkspace }) {
  const dispatch = useDispatch();
  const { currentWorkspace } = useSelector((state) => state.workspace);

  const { data: workspaces = [], isLoading } = useGetWorkspacesQuery();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!currentWorkspace && workspaces.length > 0) {
      dispatch(setCurrentWorkspace(workspaces[0]));
    }
  }, [currentWorkspace, workspaces, dispatch]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  if (isLoading) {
    return (
      <div className="px-3 py-2 rounded-xl bg-white/5 text-sm text-white/50">
        Loading workspace…
      </div>
    );
  }

  if (!workspaces.length) {
    return (
      <button
        onClick={onCreateWorkspace}
        className="flex items-center gap-3 px-3 py-2 rounded-xl
                   border border-white/15 bg-white/5
                   hover:bg-white hover:text-black transition"
      >
        + Create your first workspace
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl
                   border border-white/15 bg-white/5
                   hover:bg-white hover:text-black transition
                   max-w-55"
      >
        <Avatar workspace={currentWorkspace} />

        <div className="min-w-0 text-left">
          <p className="text-sm font-semibold truncate">
            {currentWorkspace?.name || "Select workspace"}
          </p>
          <p className="text-[11px] text-white/50 truncate">
            Workspace
          </p>
        </div>

        <span
          className={`ml-1 text-xs transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 z-50">
          <Card className="p-2 space-y-2 animate-fade-in">
            <p className="px-3 pt-2 text-xs text-white/40 uppercase tracking-wide">
              Switch workspace
            </p>

            <ul className="space-y-1 max-h-72 overflow-y-auto">
              {workspaces.map((ws) => {
                const active = currentWorkspace?._id === ws._id;

                return (
                  <li
                    key={ws._id}
                    onClick={() => {
                      dispatch(setCurrentWorkspace(ws));
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                      ${
                        active
                          ? "bg-white/90 text-black"
                          : "hover:bg-white/10"
                      }`}
                  >
                    <Avatar workspace={ws} />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {ws.name}
                      </p>
                      <p
                        className={`text-xs truncate ${
                          active
                            ? "text-black/70"
                            : "text-white/50"
                        }`}
                      >
                        {ws.description || "No description"}
                      </p>
                    </div>

                    {active && (
                      <span className="text-xs font-bold">✓</span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-white/10" />

            <button
              onClick={() => {
                setOpen(false);
                onCreateWorkspace?.();
              }}
              className="w-full px-3 py-2 rounded-lg
                         text-sm font-medium
                         border border-white/15
                         text-white/70
                         hover:bg-white hover:text-black transition"
            >
              + Create Workspace
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}

function Avatar({ workspace }) {
  const color = getWorkspaceColor(workspace?._id);

  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center
                  text-xs font-bold shrink-0 text-white ${color}`}
    >
      {getInitials(workspace?.name)}
    </div>
  );
}
