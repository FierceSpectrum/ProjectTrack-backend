import Permission from "../models/permissionModel.js";

import { isValidString } from '../utils/validateString.js';

const postPermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }

    const newPermission = await Permission.create({
      name,
      description,
    });
    return res
      .status(201)
      .header({ location: `/api/permissions/post?id=${newPermission.id}` })
      .json(newPermission);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    return res.status(200).json(permissions);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getPermissionByID = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);
    if (permission) {
      return res.status(200).json(permission);
    } else {
      return res.status(404).json({ error: "Permission not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const patchPermission = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByPk(req.params.id);
    if (permission) {
      const { name, description } = req.body;
      const updatedPermission = await permission.update({
        name: isValidString(name) ? name : permission.name,
        description: isValidString(description) ? description : permission.description,
      });

      return res.status(200).json(updatedPermission);
    } else {
      return res.status(404).json({ error: "Permission not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Check if validation is required
const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);
    if (permission) {
      await permission.destroy();
      return res.status(204).json({ message: "Permission deleted" });
    } else {
      return res.status(404).json({ error: "Permission not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

export default {
  postPermission,
  getPermissions,
  getPermissionByID,
  patchPermission,
  deletePermission,
};