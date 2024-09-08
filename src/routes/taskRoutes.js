import express from "express";
import taskFuctions from "../controllers/taskController.js";
const {
  postTask,
  getTask,
  getTaskByID,
  patchTask,
  deleteTask,
} = taskFuctions;

const router = express.Router();

// Rutas
router.post("/post", postTask);
router.get("", getTask);
router.get("/:id", getTaskByID);
router.patch("/:id", patchTask);
router.put("/:id", patchTask);
router.delete("/:id", deleteTask);

export default router;