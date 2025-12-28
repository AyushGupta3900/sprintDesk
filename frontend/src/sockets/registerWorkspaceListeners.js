import { getSocket } from "./socket";
import { baseApi } from "../api/baseApi";
import toast from "react-hot-toast";

export function registerSocketListeners(dispatch) {
  const socket = getSocket();
  if (!socket) {
    console.warn("⚠️ Socket not initialized yet");
    return;
  }

  socket.off("project:created");
  socket.off("project:updated");
  socket.off("project:deleted");
  socket.off("task:created");
  socket.off("task:updated");
  socket.off("task:deleted");

  socket.on("project:created", (payload) => {
    console.log("🔥 PROJECT CREATED EVENT RECEIVED", payload);
    toast.success(`Project "${payload.name}" created`);
    dispatch(baseApi.util.invalidateTags(["Project"]));
  });

  socket.on("project:updated", (payload) => {
    console.log("PROJECT UPDATED", payload);
    dispatch(baseApi.util.invalidateTags(["Project"]));
  });

  socket.on("project:deleted", (projectId) => {
    console.log("PROJECT DELETED", projectId);
    dispatch(baseApi.util.invalidateTags(["Project"]));
  });

  socket.on("task:created", (task) => {
    console.log("TASK CREATED", task);
    dispatch(baseApi.util.invalidateTags(["Task"]));
  });

  socket.on("task:updated", (task) => {
    console.log("TASK UPDATED", task);
    dispatch(baseApi.util.invalidateTags(["Task"]));
  });

  socket.on("task:deleted", (taskId) => {
    console.log("TASK DELETED", taskId);
    dispatch(baseApi.util.invalidateTags(["Task"]));
  });
}
