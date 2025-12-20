import http from "http";
import dotenv from "dotenv";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { connectRedis } from "./config/redis.js";
import { initSocket } from "./sockets/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Connect to DB
  await connectDatabase();

  // Connect to Redis
  await connectRedis();

  // Create HTTP server
  const server = http.createServer(app);

  // Initialize Socket.IO
  initSocket(server);

  // Start server
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();