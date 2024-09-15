import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";
import Participant from "../models/participantModel.js";
import State from "../models/stateModel.js";
import Assignment from "../models/assignmentModel.js";
import { isValidString } from "../utils/validate/string.js";
import { isValidDate } from "../utils/validate/date.js";

export const postTask = async (req, res) => {
  try {
    const {
      project_id,
      participant_id,
      state_id,
      assignment_id,
      name,
      description,
      start_date,
      end_date,
    } = req.body;

    // Required Fields
    await validateRecord(Project, project_id, "Project");
    await validateRecord(State, state_id, "State");
    await validateRecord(Assignment, assignment_id, "Assignment");

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
      {
        field: "start_date",
        value: start_date,
        validator: isValidDate,
        message: "Invalid Start Date format",
      },
      {
        field: "end_date",
        value: end_date,
        validator: isValidDate,
        message: "Invalid End Date format",
      },
    ];

    for (const { field, value, validator, message } of validations) {
      if (!value || !validator(value)) {
        return res.status(400).json({ message });
      }
    }

    // Optional Fields
    if (participant_id) {
      await validateRecord(Participant, participant_id, "Participant");
    }

    if (start_date && new Date(end_date) < new Date(start_date)) {
      return res
        .status(400)
        .json({ error: "End Date cannot be earlier than Start Date..." });
    }

    const newTask = await Task.create({
      project_id,
      participant_id: participant_id && participant_id,
      state_id,
      assignment_id,
      name,
      description,
      start_date,
      end_date,
    });

    return res
      .status(201)
      .header({ location: `/api/tasks/${newTask.id}` })
      .json({
        message: "Task created successfully",
        taskId: newTask.id,
      });
  } catch (error) {
    console.error("Error creating task:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while creating the task",
      errors: error,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "You must provide an projectID" });
    }

    const tasks = await Task.findAll({
      where: { project_id: projectId, state_task: "Create" },
      include: [
        {
          model: Project,
          as: "project",
        },
        {
          model: Participant,
          as: "participant",
        },
        {
          model: State,
          as: "state",
        },
        {
          model: Assignment,
          as: "assignment",
        },
      ],
      order: [["id", "ASC"]],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching tasks",
      errors: error,
    });
  }
};

export const getTaskByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const task = await Task.findOne({
      where: { id, state_task: "Create" },
      include: [
        {
          model: Project,
          as: "project",
        },
        {
          model: Participant,
          as: "participant",
        },
        {
          model: State,
          as: "state",
        },
        {
          model: Assignment,
          as: "assignment",
        },
      ],
    });
    if (task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the task",
      errors: error,
    });
  }
};

export const patchTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_id,
      participant_id,
      state_id,
      assignment_id,
      name,
      description,
      start_date,
      end_date,
    } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    let task = await Task.findOne({
      where: { id, state_task: "Create" },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    let updatedTask = {};
    const updateField = (field, value, validator) => {
      if (value && validator(value) && value !== task[field]) {
        updatedTask[field] = value;
      }
    };

    if (project_id) {
      await validateRecord(Project, project_id, "Project");
      updatedTask["project_Id"] = project_id;
    }

    if (participant_id) {
      await validateRecord(Participant, participant_id, "Participant");
      updatedTask["participant_id"] = participant_id;
    }

    if (state_id) {
      await validateRecord(State, state_id, "State");
      updatedTask["state_id"] = state_id;
    }

    if (assignment_id) {
      await validateRecord(Assignment, assignment_id, "Assignment");
      updatedTask["assignment_id"] = assignment_id;
    }

    updateField("name", name, isValidString);
    updateField("description", description, isValidString);
    updateField("start_date", start_date, isValidDate);

    if (end_date && isValidDate(end_date)) {
      if (start_date && new Date(end_date) < new Date(start_date)) {
        return res
          .status(400)
          .json({ error: "End Date cannot be earlier than Start Date..." });
      }
      updatedTask["end_date"] = end_date;
    }

    if (Object.keys(updatedTask).length > 0) {
      await task.update(updatedTask);
      return res.status(200).json({ message: "Task updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while updating the task",
      errors: error,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const task = await Task.findOne({
      where: { id, state_task: "Create" },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.update({ state_task: "Delete" });
    return res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the task",
      errors: error,
    });
  }
};

export const destroyTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const task = await Task.findOne({
      where: { id, state_task: "Create" },
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    return res.status(204).json({ message: "Task destroyed successfully" });
  } catch (error) {
    console.error("Error destroying task:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the task",
      errors: error,
    });
  }
};
