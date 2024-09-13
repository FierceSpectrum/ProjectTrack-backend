import User from "../models/userModel.js";
import { isValidString } from "../utils/validate/string.js";
import { verifyPassword } from "../services/authService.js";
import { isValidEmail } from "../utils/validate/email.js";

/**
 * Create a new user in the database.
 * @param {Object} req - Express Request Object.
 * @param {Object} res - Express Request Object.
 */
export const postUser = async (req, res) => {
  try {
    const { name, last_Name, email, password, user_Name } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const validations = [
      {
        field: "name",
        value: name,
        validator: isValidString,
        message: "The name is invalid or empty",
      },
      {
        field: "last_Name",
        value: last_Name,
        validator: isValidString,
        message: "The last name is invalid or empty",
      },
      {
        field: "email",
        value: email,
        validator: isValidEmail,
        message: "The email is invalid",
      },
      {
        field: "password",
        value: password,
        validator: (p) => p.length >= 8,
        message: "The password must be at least 8 characters long",
      },
      {
        field: "user_Name",
        value: user_Name,
        validator: isValidString,
        message: "The username is invalid or empty",
      },
    ];

    for (const { field, value, validator, message } of validations) {
      if (!value || !validator(value)) {
        return res.status(400).json({ error: message });
      }
    }

    const newUser = await User.create({
      name,
      last_Name,
      email,
      password,
      user_Name,
    });

    res
      .status(201)
      .header({ location: `/api/users/${newUser.id}` })
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      error: "Something went wrong while creating the user",
      details: error,
    });
  }
};

/**
 * Get all active users.
 * @param {Object} req - Express Request Object.
 * @param {Object} res - Express Request Object.
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { state_user: "Create" },
      attributes: { exclude: ["password"] },
      order: [["id", "ASC"]],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      error: "Something went wrong while fetching users",
      details: error,
    });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id, state_user: "Create" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({
      error: "Something went wrong while fetching the user",
      details: error,
    });
  }
};

/**
 * Partially updates a user's data.
 * @param {Object} req - Express Request Object.
 * @param {Object} res - Express Request Object.
 */
export const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, last_Name, email, password, user_Name } = req.body;

    const user = await User.findOne({ where: { id, state_user: "Create" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = {};
    const updateField = (field, value, validator) => {
      if (value && validator(value) && value !== user[field]) {
        updatedUser[field] = value;
      }
    };

    updateField("name", name, isValidString);
    updateField("last_Name", last_Name, isValidString);
    updateField("user_Name", user_Name, isValidString);

    if (password && password.length >= 8) {
      const isMatch = await verifyPassword(password, user.password);
      if (!isMatch) {
        updatedUser.password = password;
      }
    }

    if (Object.keys(updatedUser).length > 0) {
      await user.update(updatedUser);
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      error: "Something went wrong while updating the user",
      details: error,
    });
  }
};

/**
 * Delete a user by ID.
 * @param {Object} req - Express Request Object.
 * @param {Object} res - Express Request Object.
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id, state_user: "Create" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ state_user: "Delete" });
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      error: "Something went wrong while deleting the user",
      details: error,
    });
  }
};

/**
 * Destroy a user by ID (permanently delete).
 * @param {Object} req - Express Request Object.
 * @param {Object} res - Express Request Object.
 */
export const destroyUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id, state_user: "Delete" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).json({ message: "User destroyed successfully" });
  } catch (error) {
    console.error("Error destroying user:", error);
    return res.status(500).json({
      error: "Something went wrong while destroying the user",
      details: error,
    });
  }
};
