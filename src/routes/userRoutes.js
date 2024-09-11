import express from "express";
import userFuctions from "../controllers/userController.js";
const {
  postUser,
  getUser,
  getUserByID,
  patchUser,
  deleteUser,
} = userFuctions;

const router = express.Router();

// Rutas
router.post("/post", postUser);
router.get("", getUser);
router.get("/:id", getUserByID);
router.patch("/:id", patchUser);
router.put("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;