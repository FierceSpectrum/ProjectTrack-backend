import Role from "../models/roleModel.js";
import Permission from "../models/permissionModel.js";
import { isValidString } from '../utils/validateString.js';

const postRole = async (req, res) => {
  try {
    const { permissions, name, description } = req.body;

    permissions.map(async (permission_id) => {
      await validateRecord(Permission, permission_id, 'Permission');
    });

    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }

    const newRole = await Role.create({
      permissions,
      name,
      description
    });
    return res
      .status(201)
      .header({ location: `/api/roles/post?id=${newRole.id}` })
      .json(newRole);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getRole = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{
        model: Permission,
        as: 'permission'
      }]
    });
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getRoleByID = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: [{
        model: Permission,
        as: 'permission'
      }]
    });
    if (role) {
      return res.status(200).json(role);
    } else {
      return res.status(404).json({ error: "Role not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const patchRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions, name, description } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found..." });
    }

    let permissionsUpdated = [...role.permission_id];

    if ((permissions) && (permissions.length > 0)) {
      permissions.map(async (permission_id) => {
        await validateRecord(Permission, permission_id, 'Permission');
      });

      permissionsUpdated = permissions;
    }

    const updatedRole = await role.update({
      permission_id: permissions,
      name: isValidString(name) ? name : assignment.name,
      description: isValidString(description) ? description : assignment.description,
    });

    return res.status(200).json(updatedRole);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Check if validation is required
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (role) {
      await role.destroy();
      return res.status(204).json({ message: "Role deleted successfully" });
    } else {
      return res.status(404).json({ error: "Role not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export default {
  postRole,
  getRole,
  getRoleByID,
  patchRole,
  deleteRole,
};