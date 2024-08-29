import Assignment from "../models/assignmentModel.js";

// TODO: Probar con la base de datos que todo funcione exitosamente
const postAssignment = async (req, res) => {
  try {
    const { permission_id, name, description } = req.body;

    if (permission_id && name && description) {
      const newAssignment = await Assignment.create({
        permission_id,
        name,
        description
      });
      res.status(201).json({ message: "Assignment create successfully!", newAssignment });
    }

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAssignment = async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAssignmentByID = async (req, res) => {
  try {
    const { id } = req?.params
    const assignment = await Assignment.findByPk(id);
    if (assignment) {
      res.status(200).json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchAssignment = async (req, res) => {
  try {
    const { id } = req?.params
    const assignment = await Assignment.findByPk(id);
    if (assignment) {
      const { name, description } = req.body;
      const updatedAssignment = await assignment.update({
        name: name ? name : assignment.name,
        description: description ? description : assignment.description,
      });
      res.status(200).json({ message: "Assignment updated successfully!", updatedAssignment });
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req?.params
    const assignment = await Assignment.findByPk(id);
    if (assignment) {
      await assignment.destroy();
      res.status(204).json({ message: "Assignment deleted successfully" });
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postAssignment,
  getAssignment,
  getAssignmentByID,
  patchAssignment,
  deleteAssignment,
};