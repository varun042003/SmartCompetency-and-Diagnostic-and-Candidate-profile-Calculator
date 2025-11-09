import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import authRouter from "./routes/auth";
import meRouter from "./routes/me";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/auth", authRouter);
  app.use("/api", meRouter);

  // Ensure unhandled errors produce JSON responses (prevents HTML error pages breaking client JSON.parse)
  app.use((err: any, _req: any, res: any, next: any) => {
    console.error("Unhandled error:", err);
    if (res.headersSent) return next(err);
    res.status(500).json({ message: "Server error" });
  });

  return app;
}
