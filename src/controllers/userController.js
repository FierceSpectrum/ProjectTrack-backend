const User = require("../models/userModel");

// Funciones básicas: create, update, post, delete
const postUser = async (req, res) => {
  try {
    res.status(201).json({ message: "User create" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Users gets" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getUserByID = async (req, res) => {
  try {
    res.status(200).json({ message: "User get" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const patchUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User update" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    res.status(204).json({ message: "user delete" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postUser,
  getUser,
  getUserByID,
  patchUser,
  deleteUser,
};