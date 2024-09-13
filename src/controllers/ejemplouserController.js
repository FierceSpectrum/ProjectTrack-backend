import User from "../models/userModel.js";
import { isValidString } from "../utils/validate/string.js";
import { verifyPassword } from "../services/authService.js";
import { isValidEmail } from "../utils/validate/validateEmail.js";

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const postUser = async (req, res) => {
  try {
    const { name, last_Name, email, password, user_Name } = req.body;

    // Verificar si el correo electrónico ya está en uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Validar los datos del usuario
    const validaciones = [
      {
        campo: "name",
        valor: name,
        validador: isValidString,
        mensaje: "The name is invalid or empty",
      },
      {
        campo: "last_Name",
        valor: last_Name,
        validador: isValidString,
        mensaje: "The last name is invalid or empty",
      },
      {
        campo: "email",
        valor: email,
        validador: isValidEmail,
        mensaje: "The email is invalid",
      },
      {
        campo: "password",
        valor: password,
        validador: (p) => p.length >= 8,
        mensaje: "The password must be at least 8 characters long",
      },
      {
        campo: "user_Name",
        valor: user_Name,
        validador: isValidString,
        mensaje: "The username is invalid or empty",
      },
    ];

    for (const { campo, valor, validador, mensaje } of validaciones) {
      if (!valor || !validador(valor)) {
        return res.status(400).json({ error: mensaje });
      }
    }

    // Crear el nuevo usuario con contraseña hasheada
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
    return res
      .status(500)
      .json({ error: "Something went wrong while creating the user" });
  }
};

/**
 * Obtiene todos los usuarios activos.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { state_user: "Create" },
      attributes: { exclude: ["password"] }, // Excluye la contraseña de la respuesta
      order: [["id", "ASC"]], // Ordena los usuarios por id de forma ascendente
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while fetching users" });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca el usuario por ID y estado "Create"
    const user = await User.findOne({ where: { id, state_user: "Create" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while fetching the user" });
  }
};

/**
 * Actualiza parcialmente los datos de un usuario.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
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
    return res
      .status(500)
      .json({ error: "Something went wrong while updating the user" });
  }
};

/**
 * Elimina un usuario por ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca el usuario por ID y estado "Create"
    const user = await User.findOne({ where: { id, state_user: "Create" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ state_user: "Delete" });
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while deleting the user" });
  }
};

/**
 * Destruye un usuario por ID (elimina definitivamente).
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const destroyUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca el usuario por ID y estado "Delete"
    const user = await User.findOne({ where: { id, state_user: "Delete" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).json({ message: "User destroyed successfully" });
  } catch (error) {
    console.error("Error destroying user:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while destroying the user" });
  }
};
