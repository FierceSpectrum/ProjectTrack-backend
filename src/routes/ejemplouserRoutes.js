import express from "express";
import {
  postEjemplouser,
  getEjemplousers,
  getEjemplouserByID,
  patchEjemplouser,
  deleteEjemplouser,
  destroyEjemplouser,
} from "../controllers/ejemplouserController.js";


const router = express.Router();

// Rutas
router.post("/post", postEjemplouser);
router.get("", getEjemplousers);
router.get("/:id", getEjemplouserByID);
router.patch("/:id", patchEjemplouser);
router.put("/:id", patchEjemplouser);
router.delete("/:id", deleteEjemplouser);
router.delete("/destroy/:id", destroyEjemplouser);

export default router;