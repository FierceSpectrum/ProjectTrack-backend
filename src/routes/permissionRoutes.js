import express from "express";
import {
  postPermission,
  getPermissions,
  getPermissionByID,
  patchPermission,
  deletePermission,
} from "../controllers/permissionController.js";

const router = express.Router();

// Rutas
router.post("/post", postPermission);
router.get("", getPermissions);
router.get("/:id", getPermissionByID);
router.patch("/:id", patchPermission);
router.put("/:id", patchPermission);
router.delete("/:id", deletePermission);

export default router;