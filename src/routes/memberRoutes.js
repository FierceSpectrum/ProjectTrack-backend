import express from "express";
import memberFuctions from "../controllers/memberController.js";
const {
  postMember,
  getMembers,
  getMemberByID,
  patchMember,
  deleteMember,
} = memberFuctions;

const router = express.Router();

// Rutas
router.post("/post", postMember);
router.get("", getMembers);
router.get("/:id", getMemberByID);
router.patch("/:id", patchMember);
router.put("/:id", patchMember);
router.delete("/:id", deleteMember);

export default router;