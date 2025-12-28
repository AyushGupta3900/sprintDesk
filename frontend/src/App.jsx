import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { useGetAuthUserQuery } from "./features/auth/auth.api";
import { useGetWorkspacesQuery } from "./features/workspaces/workspace.api";
import { setCurrentWorkspace } from "./features/workspaces/workspace.slice";

import { connectSocket, disconnectSocket, getSocket } from "./sockets/socket";
import { registerSocketListeners } from "./sockets/registerWorkspaceListeners";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, authInitialized } =
    useSelector((state) => state.auth);

  const { currentWorkspace } =
    useSelector((state) => state.workspace);

  useGetAuthUserQuery(undefined, {
    skip: authInitialized,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const { data: workspaces = [] } =
    useGetWorkspacesQuery(undefined, {
      skip: !authInitialized || !isAuthenticated,
    });

  useEffect(() => {
    if (!authInitialized || !isAuthenticated) return;
    if (!workspaces.length) return;

    if (currentWorkspace) {
      const exists = workspaces.find(
        (w) => w._id === currentWorkspace._id
      );
      if (exists) {
        dispatch(setCurrentWorkspace(exists));
        return;
      }
    }

    dispatch(setCurrentWorkspace(workspaces[0]));
  }, [
    authInitialized,
    isAuthenticated,
    workspaces,
    currentWorkspace,
    dispatch,
  ]);

  useEffect(() => {
    if (!isAuthenticated || !currentWorkspace) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = connectSocket(token);

    socket.on("connect", () => {
      console.log("🔌 Registering socket listeners");
      registerSocketListeners(dispatch);

      console.log(
        "🏠 Joining workspace room:",
        currentWorkspace._id
      );
      socket.emit("workspace:join", currentWorkspace._id);
    });

    return () => {
      socket.emit("workspace:leave", currentWorkspace._id);
      disconnectSocket();
    };
  }, [isAuthenticated, currentWorkspace, dispatch]);

  return <AppRoutes />;
}

export default App;
