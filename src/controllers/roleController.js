import Role from "../models/roleModel.js";

// Funciones básicas: create, update, post, delete
const postRole = async (req, res) => {
  try {
    const nuevaRole = await Role.create(req.body);
    res.status(201).json(nuevaRole);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRole = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRoleByID = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      const updatedRole = await role.update(req.body);
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      await role.destroy();
      res.status(204).json({ message: "Role deleted" });
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postRole,
  getRole,
  getRoleByID,
  patchRole,
  deleteRole,
};