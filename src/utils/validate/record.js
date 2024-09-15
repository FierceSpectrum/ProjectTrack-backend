export const validateRecord = async (Model, id, name) => {
  if (isNaN(id)) {
    throw new Error(`Invalid ${Model} ID format`);
  }
  const record = await Model.findByPk(id);
  if (!record) {
    throw new Error(`${name} not found...`);
  }
  return record;
};
