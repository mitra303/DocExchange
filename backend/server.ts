// backend/server.ts

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
// import { protect } from "./middleware/authMiddleware";

// ✅ Load env FIRST
dotenv.config();

// 🔐 Validate env
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env");
}

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("API Running...");
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err: Error) => console.error("Mongo Error:", err.message));

// Server
const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀`);
});