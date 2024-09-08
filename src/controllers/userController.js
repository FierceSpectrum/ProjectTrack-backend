import User from "../models/userModel.js";
import { isValidString } from "../utils/validateString.js";

const isValidEmail = async (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const postUser = async (req, res) => {
  try {
    const { name, last_Name, email, password, user_Name } = req.body;

    if ((!isValidString(name)) || (!isValidString(last_Name)) || (!isValidEmail(email)) ||
      (!password.length > 8) || (!isValidString(user_Name))) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }

    const newUser = await User.create({
      name,
      last_Name,
      email,
      password,
      user_Name
    });
    return res
      .status(201)
      .header({ location: `/api/users/post?id=${newUser.id}` })
      .json(newUser);

  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Check if filter is required
const getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, last_Name, email, password, user_Name } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found..." });
    }

    const updatedUser = await user.update({
      name: isValidString(name) ? name : user.name,
      last_Name: isValidString(last_Name) ? last_Name : user.last_Name,
      email: isValidEmail(email) ? email : user.email,
      password: (password?.length > 8) ? password : user.password,
      user_Name: isValidString(user_Name) ? user_Name : user.user_Name,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Check if validation is required
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

export default {
  postUser,
  getUser,
  getUserByID,
  patchUser,
  deleteUser,
};