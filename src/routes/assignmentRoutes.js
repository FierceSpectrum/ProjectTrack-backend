import express from "express";
import assignmentFuctions from "../controllers/assignmentController.js";
const {
  postAssignment,
  getAssignment,
  getAssignmentByID,
  patchAssignment,
  deleteAssignment,
} = assignmentFuctions;

const router = express.Router();

// Rutas
router.post("/post", postAssignment);
router.get("", getAssignment);
router.get("/:id", getAssignmentByID);
router.patch("/:id", patchAssignment);
router.put("/:id", patchAssignment);
router.delete("/:id", deleteAssignment);

export default router;