import express from "express";
import {
  postAssignment,
  getAssignments,
  getAssignmentByID,
  patchAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";

const router = express.Router();

// Rutas
router.post("/post", postAssignment);
router.get("", getAssignments);
router.get("/:id", getAssignmentByID);
router.patch("/:id", patchAssignment);
router.put("/:id", patchAssignment);
router.delete("/:id", deleteAssignment);

export default router;