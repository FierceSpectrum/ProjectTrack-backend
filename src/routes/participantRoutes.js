import express from "express";
import participantFuctions from "../controllers/participantController.js";
const {
  postParticipant,
  getParticipants,
  getParticipantByID,
  patchParticipant,
  deleteParticipant,
} = participantFuctions;

const router = express.Router();

// Rutas
router.post("/post", postParticipant);
router.get("", getParticipants);
router.get("/:id", getParticipantByID);
router.patch("/:id", patchParticipant);
router.put("/:id", patchParticipant);
router.delete("/:id", deleteParticipant);

export default router;