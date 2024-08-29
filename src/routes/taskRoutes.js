import express from "express";
import {
  postTask,
  getTasks,
  getTaskByID,
  patchTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Rutas
router.post("/post", postTask);
router.get("", getTasks);
router.get("/:id", getTaskByID);
router.patch("/:id", patchTask);
router.put("/:id", patchTask);
router.delete("/:id", deleteTask);

export default router;