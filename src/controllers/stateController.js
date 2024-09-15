import State from "../models/stateModel.js";

import { isValidString } from "../utils/validate/string.js";

export const postState = async (req, res) => {
  try {
    const { name, description } = req.body;

    const validations = [
      {
        field: "name",
        value: name,
        validator: isValidString,
        message: "The name is invalid or empty",
      },
      {
        field: "description",
        value: description,
        validator: isValidString,
        message: "The description is invalid or empty",
      },
    ];

    for (const { field, value, validator, message } of validations) {
      if (!value || !validator(value)) {
        return res.status(400).json({ message });
      }
    }

    const newState = await State.create({
      name,
      description,
    });

    return res
      .status(201)
      .header({ location: `/api/states/${newState.id}` })
      .json({
        message: "State created successfully",
        stateId: newState.id,
      });
  } catch (error) {
    console.error("Error creating state:", error);
    return res.status(500).json({
      message: "Something went wrong while creating the state",
      errors: error,
    });
  }
};

export const getStates = async (req, res) => {
  try {
    const states = await State.findAll({
      where: { state_state: "Create" },
      order: [["id", "ASC"]],
    });
    return res.status(200).json(states);
  } catch (error) {
    console.error("Error fetching states:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching states",
      errors: error,
    });
  }
};

export const getStateByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const state = await State.findOne({
      where: { id, state_state: "Create" },
    });

    if (!state) {
      return res.status(404).json({ message: "State not found..." });
    }

    return res.status(200).json(state);
  } catch (error) {
    console.error("Error fetching state by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the state",
      errors: error,
    });
  }
};

export const patchState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const state = await State.findOne({
      where: { id, state_state: "Create" },
    });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const updatedState = {};
    const updateField = (field, value, validator) => {
      if (value && validator(value) && value !== state[field]) {
        updatedState[field] = value;
      }
    };

    updateField("name", name, isValidString);
    updateField("description", description, isValidString);

    if (Object.keys(updatedState).length > 0) {
      await state.update(updatedState);
      return res.status(200).json({ message: "State updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while updating the state",
      errors: error,
    });
  }
};

export const deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const state = await State.findOne({
      where: { id, state_state: "Create" },
    });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    await state.update({ state_state: "Delete" });
    return res.status(204).json({ message: "State deleted successfully" });
  } catch (error) {
    console.error("Error deleting state:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the state",
      errors: error,
    });
  }
};

export const destroyState = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const state = await State.findOne({
      where: { id, state_state: "Create" },
    });

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    await state.destroy();
    return res
      .status(204)
      .json({ message: "State destroyed successfully" });
  } catch (error) {
    console.error("Error destroying state:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the state",
      errors: error,
    });
  }
};
