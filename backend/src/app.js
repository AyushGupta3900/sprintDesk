import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

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

export default app;
