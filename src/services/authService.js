import bcrypt from "bcryptjs";

export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error al verificar la contraseña:", error);
    return false;
  }
};