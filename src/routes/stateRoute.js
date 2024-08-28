const express = require("express");
const router = express.Router();
const {
  postState,
  getStates,
  getStateByID,
  patchState,
  deleteState,
} = require("../controllers/stateController");

// Rutas
router.post("/post", postState);
router.get("", getStates);
router.get("/:id", getStateByID);
router.patch("/:id", patchState);
router.put("/:id", patchState);
router.delete("/:id", deleteState);

module.exports = router;