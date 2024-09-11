import express from "express";
import roleFuctions from "../controllers/roleController.js";
const {
  postRole,
  getRoles,
  getRoleByID,
  patchRole,
  deleteRole,
} = roleFuctions;

const router = express.Router();

// Rutas
router.post("/post", postRole);
router.get("", getRoles);
router.get("/:id", getRoleByID);
router.patch("/:id", patchRole);
router.put("/:id", patchRole);
router.delete("/:id", deleteRole);

export default router;