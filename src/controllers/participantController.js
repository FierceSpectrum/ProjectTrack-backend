import Participant from "../models/participantModel.js";

// Funciones básicas: create, update, post, delete
const postParticipant = async (req, res) => {
  try {
    const nuevaParticipant = await Participant.create(req.body);
    res.status(201).json(nuevaParticipant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getParticipant = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getParticipantByID = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (participant) {
      res.status(200).json(participant);
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (participant) {
      const updatedParticipant = await participant.update(req.body);
      res.status(200).json(updatedParticipant);
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (participant) {
      await participant.destroy();
      res.status(204).json({ message: "Participant deleted" });
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postParticipant,
  getParticipant,
  getParticipantByID,
  patchParticipant,
  deleteParticipant,
};