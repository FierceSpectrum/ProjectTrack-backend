import Project from "../models/projectModel.js";

// Funciones básicas: create, update, post, delete
const postProject = async (req, res) => {
  try {
    const nuevaProject = await Project.create(req.body);
    res.status(201).json(nuevaProject);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProject = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProjectByID = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      const updatedProject = await project.update(req.body);
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.destroy();
      res.status(204).json({ message: "Project deleted" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postProject,
  getProject,
  getProjectByID,
  patchProject,
  deleteProject,
};