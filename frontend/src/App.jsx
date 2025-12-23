import React from "react";
import { useGetAuthUserQuery } from "./features/auth/auth.api";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const token = localStorage.getItem("token");

  useGetAuthUserQuery(undefined, {skip: !token});
  return <AppRoutes />;
}

export default App;
