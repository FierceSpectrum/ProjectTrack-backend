import express from "express";
import {
  postState,
  getStates,
  getStateByID,
  patchState,
  deleteState,
} from "../controllers/stateController.js";

const router = express.Router();

// Rutas
router.post("/post", postState);
router.get("", getStates);
router.get("/:id", getStateByID);
router.patch("/:id", patchState);
router.put("/:id", patchState);
router.delete("/:id", deleteState);

export default router;