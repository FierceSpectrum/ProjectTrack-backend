import express from "express";
import organizationFuctions from "../controllers/organizationController.js";
const {
  postOrganization,
  getOrganization,
  getOrganizationByID,
  patchOrganization,
  deleteOrganization,
} = organizationFuctions;

const router = express.Router();

// Rutas
router.post("/post", postOrganization);
router.get("", getOrganization);
router.get("/:id", getOrganizationByID);
router.patch("/:id", patchOrganization);
router.put("/:id", patchOrganization);
router.delete("/:id", deleteOrganization);

export default router;