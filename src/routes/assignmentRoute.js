const express = require("express");
const router = express.Router();
const {
  postAssignment,
  getAssignments,
  getAssignmentByID,
  patchAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

// Rutas
router.post("/post", postAssignment);
router.get("", getAssignments);
router.get("/:id", getAssignmentByID);
router.patch("/:id", patchAssignment);
router.put("/:id", patchAssignment);
router.delete("/:id", deleteAssignment);

module.exports = router;