import Permission from "../models/permissionModel.js";

import { isValidString } from "../utils/validate/string.js";

export const postPermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    const validations = [
      {
        field: "name",
        value: name,
        validator: isValidString,
        message: "The name is invalid or empty",
      },
      {
        field: "description",
        value: description,
        validator: isValidString,
        message: "The description is invalid or empty",
      },
    ];

    for (const { field, value, validator, message } of validations) {
      if (!value || !validator(value)) {
        return res.status(400).json({ message });
      }
    }

    const newPermission = await Permission.create({
      name,
      description,
    });
    return res
      .status(201)
      .header({ location: `/api/permissions/${newPermission.id}` })
      .json({
        message: "Permission created successfully",
        permissionId: newPermission.id,
      });
  } catch (error) {
    console.error("Error creating permission:", error);
    return res.status(500).json({
      message: "Something went wrong while creating the permission",
      errors: error,
    });
  }
};

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      where: { state_permission: "Create" },
      order: [["id", "ASC"]],
    });
    return res.status(200).json(permissions);
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching permissions",
      errors: error,
    });
  }
};

export const getPermissionByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const permission = await Permission.findOne({
      where: { id, state_permission: "Create" },
    });

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    return res.status(200).json(permission);
  } catch (error) {
    console.error("Error fetching permission by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the permission",
      errors: error,
    });
  }
};

export const patchPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const permission = await Permission.findOne({
      where: { id, state_permission: "Create" },
    });

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    const updatedPermission = {};
    const updateField = (field, value, validator) => {
      if (value && validator(value) && value !== permission[field]) {
        updatedPermission[field] = value;
      }
    };

    updateField("name", name, isValidString);
    updateField("description", description, isValidString);

    if (Object.keys(updatedPermission).length > 0) {
      await permission.update(updatedPermission);
      return res
        .status(200)
        .json({ message: "Permission updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while updating the permission",
      errors: error,
    });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const permission = await Permission.findOne({
      where: { id, state_permission: "Create" },
    });

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    await permission.update({ state_permission: "Delete" });
    return res.status(204).json({ message: "Permission deleted successfully" });
  } catch (error) {
    console.error("Error deleting permission:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the permission",
      errors: error,
    });
  }
};

export const destroyPermission = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const permission = await Permission.findOne({
      where: { id, state_permission: "Delete" },
    });
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    await permission.destroy();
    return res
      .status(204)
      .json({ message: "Permission destroyed successfully" });
  } catch (error) {
    console.error("Error destroying permission:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the permission",
      errors: error,
    });
  }
};
