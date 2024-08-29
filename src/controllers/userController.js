import User from "../models/userModel.js";

// Funciones básicas: create, update, post, delete
const postUser = async (req, res) => {
  try {
    const nuevaUser = await User.create(req.body);
    res.status(201).json(nuevaUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const updatedUser = await user.update(req.body);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postUser,
  getUser,
  getUserByID,
  patchUser,
  deleteUser,
};