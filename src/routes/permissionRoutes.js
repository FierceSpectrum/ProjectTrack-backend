import express from "express";
import permissionFuctions from "../controllers/permissionController.js";
const {
  postPermission,
  getPermission,
  getPermissionByID,
  patchPermission,
  deletePermission,
} = permissionFuctions;

const router = express.Router();

// Rutas
router.post("/post", postPermission);
router.get("", getPermission);
router.get("/:id", getPermissionByID);
router.patch("/:id", patchPermission);
router.put("/:id", patchPermission);
router.delete("/:id", deletePermission);

export default router;