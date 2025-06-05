import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();
const localURLFrontEnd = "http://3.144.40.219";
app.use(cookieParser());
app.use(
  cors({
    origin: localURLFrontEnd,
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

app.listen(5000, "0.0.0.0", () =>
  console.log(`Servidor rodando na porta 5000`)
);
