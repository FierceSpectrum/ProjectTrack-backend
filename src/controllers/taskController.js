import Task from "../models/taskModel.js";

// Funciones básicas: create, update, post, delete
const postTask = async (req, res) => {
  try {
    const nuevaTask = await Task.create(req.body);
    res.status(201).json(nuevaTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTaskByID = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      const updatedTask = await task.update(req.body);
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(204).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postTask,
  getTask,
  getTaskByID,
  patchTask,
  deleteTask,
};