import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "../features/auth/Register";

export default function RegisterPage() {
  const { isAuthenticated} = useSelector(
    (state) => state.auth
  );
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Register />;
}
