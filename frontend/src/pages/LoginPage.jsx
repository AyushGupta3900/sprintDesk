import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../features/auth/Login";

export default function LoginPage() {
  const { isAuthenticated} = useSelector(
    (state) => state.auth
  );
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Login />;
}
