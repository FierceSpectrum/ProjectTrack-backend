import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";
import Participant from "../models/participantModel.js";
import State from "../models/stateModel.js";
import Assignment from "../models/assignmentModel.js";
import { isValidDate } from "../utils/validateDate.js";

const postTask = async (req, res) => {
  try {
    const { project_id, participant_id, state_id, assignment_id, name, description, start_date, end_date } = req.body;

    // Required Fields
    await validateRecord(Project, project_id, 'Project');
    await validateRecord(State, state_id, 'State');
    await validateRecord(Assignment, assignment_id, 'Assignment');

    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }


    // Optional Fields
    if (participant_id) {
      await validateRecord(Participant, participant_id, 'Participant');
    }

    if (start_date) {
      if (!isValidDate(start_date)) {
        return res.status(400).json({ error: "Invalid Start Date format..." });
      }
    }

    if (end_date) {
      if (!isValidDate(end_date)) {
        return res.status(400).json({ error: "Invalid End Date format..." });
      }

      if (start_date && new Date(end_date) < new Date(start_date)) {
        return res.status(400).json({ error: "End Date cannot be earlier than Start Date..." });
      }
    }

    const newTask = await Task.create({
      project_id,
      participant_id: participant_id && participant_id,
      state_id,
      assignment_id,
      name,
      description,
      start_date: start_date && start_date,
      end_date: end_date && end_date,
    });

    return res
      .status(201)
      .header({ location: `/api/tasks/post?id=${newTask.id}` })
      .json(newTask);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ error: 'You must provide an projectID...' });
    }

    const filter = { project_id: projectId };


    const tasks = await Task.findAll({
      where: filter,
      include: [
        {
          model: Project,
          as: 'project'
        },
        {
          model: Participant,
          as: 'participant'
        },
        {
          model: State,
          as: 'state'
        },
        {
          model: Assignment,
          as: 'assignment'
        },
      ]
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getTaskByID = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [
        {
          model: Project,
          as: 'project'
        },
        {
          model: Participant,
          as: 'participant'
        },
        {
          model: State,
          as: 'state'
        },
        {
          model: Assignment,
          as: 'assignment'
        },
      ]
    });
    if (task) {
      return res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found...." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const patchTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id, participant_id, state_id, assignment_id, name, description, start_date, end_date } = req.body;

    let task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found..." });
    }

    if (project_id) {
      await validateRecord(Project, project_id, 'Project');
      task.project_Id = project_id;
    }

    if (participant_id) {
      await validateRecord(Participant, participant_id, 'Participant');
      task.participant_id = participant_id;
    }

    if (state_id) {
      await validateRecord(State, state_id, 'State');
      task.state_id = state_id;
    }

    if (assignment_id) {
      await validateRecord(Assignment, assignment_id, 'Assignment');
      task.assignment_id = assignment_id;
    }

    if (isValidString(name)) {
      task.name = name;
    }

    if (isValidString(description)) {
      task.description = description;
    }

    if (start_date) {
      if (!isValidDate(start_date)) {
        return res.status(400).json({ error: "Invalid Start Date format..." });
      }
      task.start_date = start_date;
    }

    if (end_date) {
      if (!isValidDate(end_date)) {
        return res.status(400).json({ error: "Invalid End Date format..." });
      }

      if (start_date && new Date(end_date) < new Date(start_date)) {
        return res.status(400).json({ error: "End Date cannot be earlier than Start Date..." });
      }
      task.end_date = end_date;
    }

    const updatedTask = await task.update(task);
    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Check if validation is required
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      return res.status(204).json({ message: "Task deleted successfully" });
    } else {
      return res.status(404).json({ error: "Task not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

export default {
  postTask,
  getTasks,
  getTaskByID,
  patchTask,
  deleteTask,
};