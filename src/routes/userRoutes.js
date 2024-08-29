import express from "express";
import {
  postUser,
  getUsers,
  getUserByID,
  patchUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Rutas
router.post("/post", postUser);
router.get("", getUsers);
router.get("/:id", getUserByID);
router.patch("/:id", patchUser);
router.put("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;