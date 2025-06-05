import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { localURL } from "../frontend/src/assets/httpService/httpService.js";

dotenv.config();

const app = express();
const localURL = "http://18.224.67.75";
app.use(cookieParser());
app.use(
  cors({
    origin: localURL,
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

connectDB();

app.get("/", (req, res) => res.send("API rodando!"));

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
