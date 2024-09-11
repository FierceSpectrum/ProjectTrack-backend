import Assignment from "../models/assignmentModel.js";
import Permission from '../models/permissionModel.js';
import { isValidString } from '../utils';

// TODO: Probar con la base de datos que todo funcione exitosamente
const postAssignment = async (req, res) => {
  try {
    const { permissions, name, description } = req.body;

    permissions.map(async (permission_id) => {
      await validateRecord(Permission, permission_id, 'Permission');
    });

    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }

    const newAssignment = await Assignment.create({
      permissions,
      name,
      description
    });
    return res
      .status(201)
      .header({ location: `/api/assignments/post?id=${newAssignment.id}` })
      .json(newAssignment);

  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getAssignments = async (req, res) => {
  try {
    // TODO: Probar si con el `include` obtengo los detalles del otro modelo
    const assignments = await Assignment.findAll({
      include: [{
        model: Permission,
        as: 'permission'
      }]
    });
    return res.status(200).json(assignments);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

const getAssignmentByID = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findByPk(id, {
      include: [{
        model: Permission,
        as: 'permission'
      }]
    });
    if (assignment) {
      return res.status(200).json(assignment);
    } else {
      return res.status(404).json({ error: "Assignment not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

const patchAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions, name, description } = req.body;

    const assignment = await Assignment.findByPk(id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found..." });
    }

    let permissionsUpdated = [...assignment.permission_id];

    if ((permissions) && (permissions.length > 0)) {
      permissions.map(async (permission_id) => {
        await validateRecord(Permission, permission_id, 'Permission');
      });

      permissionsUpdated = permissions;
    }

    const updatedAssignment = await assignment.update({
      permission_id: permissions,
      name: isValidString(name) ? name : assignment.name,
      description: isValidString(description) ? description : assignment.description,
    });
    return res.status(200).json(updatedAssignment);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Check if validation is required
const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id);
    if (assignment) {
      await assignment.destroy();
      return res.status(204).json({ message: "Assignment deleted successfully" });
    } else {
      return res.status(404).json({ error: "Assignment not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export default {
  postAssignment,
  getAssignments,
  getAssignmentByID,
  patchAssignment,
  deleteAssignment,
};