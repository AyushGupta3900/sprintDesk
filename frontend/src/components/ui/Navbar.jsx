import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../features/auth/auth.api";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, authInitialized } = useSelector(
    (state) => state.auth
  );

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  if (!authInitialized) return null;

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <h1
          className="text-xl font-extrabold tracking-tight cursor-pointer hover:opacity-90 transition"
          onClick={() => navigate("/home")}
        >
          SprintDesk
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-white transition"
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
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition disabled:opacity-50"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
