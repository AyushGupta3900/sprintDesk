import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt.js";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Authentication error"));
      }

      const decoded = verifyToken(token);

      socket.user = {
        id: decoded.userId,
        workspaceId: decoded.currentWorkspaceId,
      };

      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const workspaceRoom = `workspace:${socket.user.workspaceId}`;

    socket.join(workspaceRoom);

    console.log(
      `🔌 User ${socket.user.id} connected to ${workspaceRoom}`
    );

    socket.on("disconnect", () => {
      console.log(`User ${socket.user.id} disconnected`);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
