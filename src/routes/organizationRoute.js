const express = require("express");
const router = express.Router();
const {
  postOrganization,
  getOrganizations,
  getOrganizationByID,
  patchOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");

// Rutas
router.post("/post", postOrganization);
router.get("", getOrganizations);
router.get("/:id", getOrganizationByID);
router.patch("/:id", patchOrganization);
router.put("/:id", patchOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;