import Assignment from "../models/assignmentModel.js";

// Funciones básicas: create, update, post, delete
const postAssignment = async (req, res) => {
  try {
    const nuevaAssignment = await Assignment.create(req.body);
    res.status(201).json(nuevaAssignment);
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
    const assignment = await Assignment.findByPk(req.params.id);
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
    const assignment = await Assignment.findByPk(req.params.id);
    if (assignment) {
      const updatedAssignment = await assignment.update(req.body);
      res.status(200).json(updatedAssignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (assignment) {
      await assignment.destroy();
      res.status(204).json({ message: "Assignment deleted" });
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