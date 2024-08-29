import Permission from "../models/permissionModel.js";

// Funciones básicas: create, update, post, delete
const postPermission = async (req, res) => {
  try {
    const nuevaPermission = await Permission.create(req.body);
    res.status(201).json(nuevaPermission);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPermission = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPermissionByID = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (permission) {
      res.status(200).json(permission);
    } else {
      res.status(404).json({ message: "Permission not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchPermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (permission) {
      const updatedPermission = await permission.update(req.body);
      res.status(200).json(updatedPermission);
    } else {
      res.status(404).json({ message: "Permission not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (permission) {
      await permission.destroy();
      res.status(204).json({ message: "Permission deleted" });
    } else {
      res.status(404).json({ message: "Permission not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postPermission,
  getPermission,
  getPermissionByID,
  patchPermission,
  deletePermission,
};