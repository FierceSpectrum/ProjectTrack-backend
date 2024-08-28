const express = require("express");
const router = express.Router();
const {
  postMember,
  getMembers,
  getMemberByID,
  patchMember,
  deleteMember,
} = require("../controllers/memberController");

// Rutas
router.post("/post", postMember);
router.get("", getMembers);
router.get("/:id", getMemberByID);
router.patch("/:id", patchMember);
router.put("/:id", patchMember);
router.delete("/:id", deleteMember);

module.exports = router;