import express from "express";
import stateFuctions from "../controllers/stateController.js";
const {
  postState,
  getStates,
  getStateByID,
  patchState,
  deleteState,
} = stateFuctions;

const router = express.Router();

// Rutas
router.post("/post", postState);
router.get("", getStates);
router.get("/:id", getStateByID);
router.patch("/:id", patchState);
router.put("/:id", patchState);
router.delete("/:id", deleteState);

export default router;