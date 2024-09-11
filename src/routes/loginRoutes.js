import express from "express";
import loginFuctions from "../controllers/loginController.js";
const {
  postLogin,
  getLogins,
  getLoginByID,
  patchLogin,
  deleteLogin,
} = loginFuctions;

const router = express.Router();

// Rutas
router.post("/post", postLogin);
router.get("", getLogins);
router.get("/:id", getLoginByID);
router.patch("/:id", patchLogin);
router.put("/:id", patchLogin);
router.delete("/:id", deleteLogin);

export default router;