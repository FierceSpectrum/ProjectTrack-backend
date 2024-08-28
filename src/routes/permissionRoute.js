const express = require("express");
const router = express.Router();
const {
  postPermission,
  getPermissions,
  getPermissionByID,
  patchPermission,
  deletePermission,
} = require("../controllers/permissionController");

// Rutas
router.post("/post", postPermission);
router.get("", getPermissions);
router.get("/:id", getPermissionByID);
router.patch("/:id", patchPermission);
router.put("/:id", patchPermission);
router.delete("/:id", deletePermission);

module.exports = router;