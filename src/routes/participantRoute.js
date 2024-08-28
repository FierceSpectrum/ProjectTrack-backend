const express = require("express");
const router = express.Router();
const {
  postParticipant,
  getParticipants,
  getParticipantByID,
  patchParticipant,
  deleteParticipant,
} = require("../controllers/participantController");

// Rutas
router.post("/post", postParticipant);
router.get("", getParticipants);
router.get("/:id", getParticipantByID);
router.patch("/:id", patchParticipant);
router.put("/:id", patchParticipant);
router.delete("/:id", deleteParticipant);

module.exports = router;