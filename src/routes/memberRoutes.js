import express from "express";
import {
  postMember,
  getMembers,
  getMemberByID,
  patchMember,
  deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

// Rutas
router.post("/post", postMember);
router.get("", getMembers);
router.get("/:id", getMemberByID);
router.patch("/:id", patchMember);
router.put("/:id", patchMember);
router.delete("/:id", deleteMember);

export default router;