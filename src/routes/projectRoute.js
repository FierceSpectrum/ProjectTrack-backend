const express = require("express");
const router = express.Router();
const {
  postProject,
  getProjects,
  getProjectByID,
  patchProject,
  deleteProject,
} = require("../controllers/projectController");

// Rutas
router.post("/post", postProject);
router.get("", getProjects);
router.get("/:id", getProjectByID);
router.patch("/:id", patchProject);
router.put("/:id", patchProject);
router.delete("/:id", deleteProject);

module.exports = router;