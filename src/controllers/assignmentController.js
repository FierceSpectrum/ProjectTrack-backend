import Assignment from "../models/assignmentModel.js";
import Permission from "../models/permissionModel.js";
import { isValidString } from "../utils/validate/string.js";

export const postAssignment = async (req, res) => {
  try {
    const { permissions_id, name, description } = req.body;

    permissions_id.map(async (permission_id) => {
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

    const newAssignment = await Assignment.create({
      permissions_id,
      name,
      description,
    });
    return res
      .status(201)
      .header({ location: `/api/assignments/${newAssignment.id}` })
      .json({
        message: "Assignment created successfully",
        assignmentId: newAssignment.id,
      });
  } catch (error) {
    console.error("Error creating assignment:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while creating the assignment",
      errors: error,
    });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      where: { state_assignment: "Create" },
      include: [
        {
          model: Permission,
          as: "permission",
        },
      ],
      order: [["id", "ASC"]],
    });
    return res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching assignments",
      errors: error,
    });
  }
};

export const getAssignmentByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const assignment = await Assignment.findOne({
      where: { id, state_assignment: "Create" },
      include: [
        {
          model: Permission,
          as: "permission",
        },
      ],
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json(assignment);
  } catch (error) {
    console.error("Error fetching assignment by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the assignment",
      errors: error,
    });
  }
};

export const patchAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions, name, description } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const assignment = await Assignment.findOne({
      where: { id, state_assignment: "Create" },
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const updatedAssignment = {};
    const updateField = (field, value, validator) => {
      if (value && validator(value) && value !== assignment[field]) {
        updatedAssignment[field] = value;
      }
    };

    if (permissions && permissions.length > 0) {
      permissions.map(async (permission_id) => {
        await validateRecord(Permission, permission_id, "Permission");
      });

      updatedAssignment["permissions_id"] = permissions;
    }

    updateField("name", name, isValidString);
    updateField("description", description, isValidString);

    if (Object.keys(updatedAssignment).length > 0) {
      await assignment.update(updatedAssignment);
      return res
        .status(200)
        .json({ message: "Assignment updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating assignment:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while updating the assignment",
      errors: error,
    });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const assignment = await Assignment.findOne({
      where: { id, state_assignment: "Create" },
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignment.update({ state_assignment: "Delete" });
    return res.status(204).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the assignment",
      errors: error,
    });
  }
};

export const destroyAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const assignment = await Assignment.findOne({
      where: { id, state_assignment: "Delete" },
    });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignment.destroy();
    return res
      .status(204)
      .json({ message: "Assignment destroyed successfully" });
  } catch (error) {
    console.error("Error destroying assignment:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the assignment",
      errors: error,
    });
  }
};
