import Assignment from "../models/assignmentModel.js";
import Permission from '../models/permissionModel.js';
import { isValidString } from '../services/validateString.js';

// TODO: Probar con la base de datos que todo funcione exitosamente
const postAssignment = async (req, res) => {
  try {
    const { permission_id, name, description } = req.body;

    const permission = await Permission.findByPk(permission_id);

    if (!permission) {
      return res.status(404).json({ error: 'Permission not found...' });
    }

    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }

    const newAssignment = await Assignment.create({
      permission_id,
      name,
      description
    });
    return res
      .status(201)
      // TODO: Modificar la ruta por la real una vez se creen los routes
      .header({ location: `/api/post?id=${newAssignment.id}` })
      .json(newAssignment);

  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getAssignment = async (req, res) => {
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

    // TODO: Probar si con el `include` obtengo los detalles del otro modelo
    const assignment = await Assignment.findByPk(id, {
      include: [{
        model: Permission,
        as: 'permission'
      }]
    });
    if (assignment) {
      return res.status(200).json(assignment);
    } else {
      return res.status(404).json({ message: "Assignment not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

const patchAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id);
    if (assignment) {
      const { permission_id, name, description } = req.body;

      if (permission_id) {
        const permission = await Permission.findByPk(permission_id);

        if (!permission) {
          return res.status(404).json({ error: 'Permission not found...' });
        }
      }

      const updatedAssignment = await assignment.update({
        permission_id: permission_id ? permission_id : assignment.permission_id,
        name: isValidString(name) ? name : assignment.name,
        description: isValidString(description) ? description : assignment.description,
      });
      return res.status(200).json(updatedAssignment);
    } else {
      return res.status(404).json({ message: "Assignment not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Averiguar si tiene restricciones de eliminación
const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id);
    if (assignment) {
      await assignment.destroy();
      return res.status(204).json({ message: "Assignment deleted successfully" });
    } else {
      return res.status(404).json({ message: "Assignment not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export default {
  postAssignment,
  getAssignment,
  getAssignmentByID,
  patchAssignment,
  deleteAssignment,
};