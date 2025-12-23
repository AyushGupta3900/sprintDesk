import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authInitialized } = useSelector(
    (state) => state.auth
  );

  if (!authInitialized) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
