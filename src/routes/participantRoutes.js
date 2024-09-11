import express from "express";
import participantFuctions from "../controllers/participantController.js";
const {
  postParticipant,
  getParticipant,
  getParticipantByID,
  patchParticipant,
  deleteParticipant,
} = participantFuctions;

const router = express.Router();

// Rutas
router.post("/post", postParticipant);
router.get("", getParticipant);
router.get("/:id", getParticipantByID);
router.patch("/:id", patchParticipant);
router.put("/:id", patchParticipant);
router.delete("/:id", deleteParticipant);

export default router;