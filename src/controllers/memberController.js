import Member from "../models/memberModel.js";

// Funciones básicas: create, update, post, delete
const postMember = async (req, res) => {
  try {
    const nuevaMember = await Member.create(req.body);
    res.status(201).json(nuevaMember);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMember = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMemberByID = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (member) {
      const updatedMember = await member.update(req.body);
      res.status(200).json(updatedMember);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (member) {
      await member.destroy();
      res.status(204).json({ message: "Member deleted" });
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  postMember,
  getMember,
  getMemberByID,
  patchMember,
  deleteMember,
};