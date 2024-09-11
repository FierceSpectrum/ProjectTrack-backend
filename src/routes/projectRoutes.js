import express from "express";
import projectFuctions from "../controllers/projectController.js";
const {
  postProject,
  getProject,
  getProjectByID,
  patchProject,
  deleteProject,
} = projectFuctions;

const router = express.Router();

// Rutas
router.post("/post", postProject);
router.get("", getProject);
router.get("/:id", getProjectByID);
router.patch("/:id", patchProject);
router.put("/:id", patchProject);
router.delete("/:id", deleteProject);

export default router;