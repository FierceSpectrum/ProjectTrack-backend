export const isValidUrl = (link) => {
  try {
    new URL(link);
    return true;
  } catch (err) {
    return false;
  }
};
