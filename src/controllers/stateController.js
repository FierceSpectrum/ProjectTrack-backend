import State from "../models/stateModel.js";

// Funciones básicas: create, update, post, delete
const postState = async (req, res) => {
  try {
    const nuevaState = await State.create(req.body);
    res.status(201).json(nuevaState);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getState = async (req, res) => {
  try {
    const states = await State.findAll();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStateByID = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (state) {
      res.status(200).json(state);
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchState = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (state) {
      const updatedState = await state.update(req.body);
      res.status(200).json(updatedState);
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteState = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (state) {
      await state.destroy();
      res.status(204).json({ message: "State deleted" });
    } else {
      res.status(404).json({ message: "State not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postState,
  getState,
  getStateByID,
  patchState,
  deleteState,
};