import Role from "../models/roleModel.js";
import Permission from "../models/permissionModel.js";
import { isValidString } from "../utils/validate/string.js";

export const postRole = async (req, res) => {
  try {
    const { permissions, name, description } = req.body;

    permissions.map(async (permission_id) => {
      await validateRecord(Permission, permission_id, "Permission");
    });

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

    const newRole = await Role.create({
      permissions,
      name,
      description,
    });
    return res
      .status(201)
      .header({ location: `/api/roles/${newRole.id}` })
      .json({
        message: "Role created successfully",
        roleId: newRole.id,
      });
  } catch (error) {
    console.error("Error creating role:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while creating the role",
      errors: error,
    });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      where: { state_role: "Create" },
      include: [
        {
          model: Permission,
          as: "permission",
        },
      ],
      order: [["id", "ASC"]],
    });
    return res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching roles",
      errors: error,
    });
  }
};

export const getRoleByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const role = await Role.findOne({
      where: { id, state_role: "Create" },
      include: [
        {
          model: Permission,
          as: "permission",
        },
      ],
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json(role);
  } catch (error) {
    console.error("Error fetching role by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the role",
      errors: error,
    });
  }
};

export const patchRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions, name, description } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const role = await Role.findOne({
      where: { id, state_role: "Create" },
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const updatedRole = {};
    const updateField = (field, value, validator) => {
      if (value && validator(value) && value !== role[field]) {
        updatedRole[field] = value;
      }
    };

    if (permissions && permissions.length > 0) {
      permissions.map(async (permission_id) => {
        await validateRecord(Permission, permission_id, "Permission");
      });

      updatedRole["permissions_id"] = permissions;
    }

    updateField("name", name, isValidString);
    updateField("description", description, isValidString);

    if (Object.keys(updatedRole).length > 0) {
      await role.update(updatedRole);
      return res.status(200).json({ message: "Role updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating role:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while updating the role",
      errors: error,
    });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const role = await Role.findOne({
      where: { id, state_role: "Create" },
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await role.update({ state_role: "Delete" });
    return res.status(204).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the role",
      errors: error,
    });
  }
};

export const destroyRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const role = await Role.findOne({
      where: { id, state_assignment: "Delete" },
    });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await role.destroy();
    return res.status(204).json({ message: "Role destroyed successfully" });
  } catch (error) {
    console.error("Error destroying role:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the role",
      errors: error,
    });
  }
};
