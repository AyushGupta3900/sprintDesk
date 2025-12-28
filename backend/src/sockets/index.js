import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt.js";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" },
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
        workspaceId: decoded.currentWorkspaceId || null,
      };

      next();
    } catch {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const workspaceId = socket.user.workspaceId;

    if (workspaceId) {
      const room = `workspace:${workspaceId}`;
      socket.join(room);
      console.log(`🔌 User ${socket.user.id} joined ${room}`);
    }

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
