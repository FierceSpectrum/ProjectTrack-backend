const Project = require("../models/projectModel");

// Funciones básicas: create, update, post, delete
const postProject = async (req, res) => {
  try {
    res.status(201).json({ message: "Project create" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProject = async (req, res) => {
  try {
    res.status(200).json({ message: "Projects gets" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProjectByID = async (req, res) => {
  try {
    res.status(200).json({ message: "Project get" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const patchProject = async (req, res) => {
  try {
    res.status(200).json({ message: "Project update" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteProject = async (req, res) => {
  try {
    res.status(204).json({ message: "project delete" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postProject,
  getProject,
  getProjectByID,
  patchProject,
  deleteProject,
};