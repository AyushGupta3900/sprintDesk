import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import workspaceRoutes from "./routes/workspace.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

// security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());

// body parsing
app.use(express.json());

// logging
app.use(morgan("dev"));

// swagger docs
const swaggerDocument = YAML.load("./docs/openapi.yaml");
console.log("Swagger document:", swaggerDocument);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// testing error middleware 
// app.get("/error-test", () => {
//   throw new Error("Test error");
// });

// testing auth middleware 
// app.get("/protected", authMiddleware, (req, res) => {
//   res.json({
//     message: "Access granted",
//     user: req.user,
//   });
// });

// error handler (must be last)
app.use(errorMiddleware);

export default app;