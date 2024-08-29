import express from "express";
import {
  postProject,
  getProjects,
  getProjectByID,
  patchProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Rutas
router.post("/post", postProject);
router.get("", getProjects);
router.get("/:id", getProjectByID);
router.patch("/:id", patchProject);
router.put("/:id", patchProject);
router.delete("/:id", deleteProject);

export default router;