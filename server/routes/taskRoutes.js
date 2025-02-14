import express from "express";
import {
  createTask,
  getUsertasks,
  getTodayTasks,
  getUpcomingTasks,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getUsertasks);

router.get("/today", authMiddleware, getTodayTasks);

router.get("/upcoming", authMiddleware, getUpcomingTasks);

router.put("/:taskId", authMiddleware, updateTask);

router.patch("/:taskId/toggle", authMiddleware, toggleTaskCompletion);

router.delete("/:taskId", authMiddleware, deleteTask);

export default router;
