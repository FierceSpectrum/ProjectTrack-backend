import State from "../models/stateModel.js";

import { isValidString } from '../services/validateString.js';

const postState = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }
    const newState = await State.create({
      name,
      description,
    });
    return res
      .status(201)
      // TODO: Modificar la ruta por la real una vez se creen los routes
      .header({ location: `/api/postid=${newAssignment.id}` })
      .json(newState);

  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getState = async (req, res) => {
  try {
    const states = await State.findAll();
    return res.status(200).json(states);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getStateByID = async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByPk(id);

    if (state) {
      return res.status(200).json(state);
    } else {
      return res.status(404).json({ message: "State not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const patchState = async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByPk(id);

    if (state) {
      const { name, description } = req.body;

      const updatedState = await state.update({
        name: isValidString(name) ? name : state.name,
        description: isValidString(description) ? description : state.description,
      });

      return res.status(200).json(updatedState);
    } else {
      return res.status(404).json({ message: "State not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByPk(id);
    if (state) {
      await state.destroy();
      return res.status(204).json({ message: "State deleted successfully" });
    } else {
      return res.status(404).json({ message: "State not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

export default {
  postState,
  getState,
  getStateByID,
  patchState,
  deleteState,
};