import Organization from "../models/organizationModel.js";

// Funciones básicas: create, update, post, delete
const postOrganization = async (req, res) => {
  try {
    const nuevaOrganization = await Organization.create(req.body);
    res.status(201).json(nuevaOrganization);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrganization = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrganizationByID = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (organization) {
      res.status(200).json(organization);
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (organization) {
      const updatedOrganization = await organization.update(req.body);
      res.status(200).json(updatedOrganization);
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (organization) {
      await organization.destroy();
      res.status(204).json({ message: "Organization deleted" });
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postOrganization,
  getOrganization,
  getOrganizationByID,
  patchOrganization,
  deleteOrganization,
};