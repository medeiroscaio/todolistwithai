import express from "express";
import { updateProfileImage } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/updateProfileImage", authMiddleware, updateProfileImage);

export default router;
