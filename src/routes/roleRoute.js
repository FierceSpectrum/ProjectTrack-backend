const express = require("express");
const router = express.Router();
const {
  postRole,
  getRoles,
  getRoleByID,
  patchRole,
  deleteRole,
} = require("../controllers/roleController");

// Rutas
router.post("/post", postRole);
router.get("", getRoles);
router.get("/:id", getRoleByID);
router.patch("/:id", patchRole);
router.put("/:id", patchRole);
router.delete("/:id", deleteRole);

module.exports = router;