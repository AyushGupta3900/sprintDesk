import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../features/auth/auth.slice";
import { clearWorkspace } from "../../features/workspaces/workspace.slice";
import { baseApi } from "../../api/baseApi";

import WorkspaceSwitcher from "../../features/workspaces/WorkspaceSwitcher";
import CreateWorkspaceModal from "../../features/workspaces/CreateWorkspaceModal";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, authInitialized } = useSelector(
    (state) => state.auth
  );

  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!authInitialized) return null;

  const isAppRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/tasks") ||
    location.pathname.startsWith("/projects") ||
    location.pathname.startsWith("/members") ||
    location.pathname.startsWith("/settings");

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch(logout());
    dispatch(clearWorkspace());

    dispatch(baseApi.util.resetApiState());

    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition"
          >
            <img
              src="/logo.png"
              alt="SprintDesk Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-extrabold tracking-tight text-white">
              SprintDesk
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated || !isAppRoute ? (
              <>
                <Link
                  to="/login"
                  className="text-sm text-white/70 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <WorkspaceSwitcher
                  onCreateWorkspace={() =>
                    setOpenWorkspaceModal(true)
                  }
                />

                <button
                  onClick={() => setOpenLogoutModal(true)}
                  className="text-sm px-3 py-2 rounded-lg
                             border border-white/10 text-white/60
                             hover:text-white hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden w-10 h-10 rounded-lg border border-white/10
                       text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95">
            <div className="px-6 py-4 space-y-4">
              {!isAuthenticated || !isAppRoute ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block text-white/80 hover:text-white transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <WorkspaceSwitcher
                    onCreateWorkspace={() => {
                      setOpenWorkspaceModal(true);
                      setMobileOpen(false);
                    }}
                  />

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenLogoutModal(true);
                    }}
                    className="text-red-400 px-3 py-2 rounded-lg
                               border border-red-500/20
                               hover:bg-red-500/10 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {openWorkspaceModal && (
        <CreateWorkspaceModal
          onClose={() => setOpenWorkspaceModal(false)}
        />
      )}

      {openLogoutModal && (
        <Modal
          open
          onClose={() => setOpenLogoutModal(false)}
          title="Confirm logout"
        >
          <p className="text-sm text-white/70">
            Are you sure you want to log out of SprintDesk?
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setOpenLogoutModal(false)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
