/**
 * Valida si una cadena es un correo electrónico válido.
 * @param {string} email - El correo electrónico a validar.
 * @returns {boolean} - Verdadero si el correo es válido, falso en caso contrario.
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};