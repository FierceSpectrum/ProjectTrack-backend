// Validates that the entered string is correct

export const isValidString = (str) => {
    return str !== undefined && str !== null && str.trim() !== '';
}