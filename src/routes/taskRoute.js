const express = require("express");
const router = express.Router();
const {
  postTask,
  getTasks,
  getTaskByID,
  patchTask,
  deleteTask,
} = require("../controllers/taskController");

// Rutas
router.post("/post", postTask);
router.get("", getTasks);
router.get("/:id", getTaskByID);
router.patch("/:id", patchTask);
router.put("/:id", patchTask);
router.delete("/:id", deleteTask);

module.exports = router;