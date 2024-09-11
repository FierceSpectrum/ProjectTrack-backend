export const validateRecord = async (Model, id, name) => {
    const record = await Model.findByPk(id);
    if (!record) {
        throw new Error(`${name} not found...`);
    }
    return record;
};