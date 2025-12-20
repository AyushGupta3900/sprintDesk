import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

// security
app.use(helmet());
app.use(cors());

// body parsing
app.use(express.json());

// logging
app.use(morgan("dev"));

// health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// testing error middleware 
// app.get("/error-test", () => {
//   throw new Error("Test error");
// });

// testing auth middleware 
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});


app.use(errorMiddleware);

export default app;