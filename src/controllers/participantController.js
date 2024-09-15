import Participant from "../models/participantModel.js";
import Project from "../models/projectModel.js";
import Member from "../models/memberModel.js";
import Assignment from "../models/assignmentModel.js";

export const postParticipant = async (req, res) => {
  try {
    const { project_id, member_id, assignments_id } = req.body;

    await validateRecord(Project, project_id, "Project");
    await validateRecord(Member, member_id, "Member");

    assignments_id.map(async (assignment_id) => {
      await validateRecord(Assignment, assignment_id, "Assignment");
    });

    const existingParticipant = await Participant.findOne({
      where: {
        member_id,
        project_id,
      },
    });

    if (existingParticipant) {
      return res.status(400).json({
        message: "This member is already a participant of this project.",
      });
    }

    const newParticipant = await Participant.create({
      project_id,
      member_id,
      assignments_id,
    });
    return res
      .status(201)
      .header({ location: `/api/participants/${newParticipant.id}` })
      .json({
        message: "Participant created successfully",
        participantId: newParticipant.id,
      });
  } catch (error) {
    console.error("Error creating participant:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while creating the participant",
      errors: error,
    });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res
        .status(400)
        .json({ message: "You must provide an projectID..." });
    }

    const participants = await Participant.findAll({
      where: {
        project_id: projectId,
        state_participant: "Create",
      },
      include: [
        {
          model: Project,
          as: "project",
        },
        {
          model: Member,
          as: "member",
        },
        {
          model: Assignment,
          as: "assignment",
        },
      ],
      order: [["id", "ASC"]],
    });

    return res.status(200).json(participants);
  } catch (error) {
    console.error("Error fetching participants:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching participants",
      errors: error,
    });
  }
};

export const getParticipantByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const participant = await Participant.findOne({
      where: { id, state_participant: "Create" },
      include: [
        {
          model: Project,
          as: "project",
        },
        {
          model: Member,
          as: "member",
        },
        {
          model: Assignment,
          as: "assignment",
        },
      ],
    });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    return res.status(200).json(participant);
  } catch (error) {
    console.error("Error fetching particpant by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the particpant",
      errors: error,
    });
  }
};

export const patchParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id, member_id, assignments } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const participant = await Participant.findOne({
      where: { id, state_participant: "Create" },
    });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    const updatedParticipant = {};

    if (project_id) {
      await validateRecord(Project, project_id, "Project");
      updatedParticipant["project_Id"] = project_id;
    }

    if (member_id) {
      await validateRecord(Member, member_id, "Member");
      updatedParticipant["member_id"] = member_id;
    }

    if (assignments && assignments.length > 0) {
      assignments.map(async (assignment_id) => {
        await validateRecord(Assignment, assignment_id, "Assignment");
      });

      updatedParticipant["assignments_id"] = assignments;
    }

    if (Object.keys(updatedParticipant).length > 0) {
      await participant.update(updatedParticipant);
      return res
        .status(200)
        .json({ message: "Participant updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating participant:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while updating the participant",
      errors: error,
    });
  }
};

export const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const participant = await Participant.findOne({
      where: { id, state_participant: "Create" },
    });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    await participant.update({ state_participant: "Delete" });
    return res
      .status(204)
      .json({ message: "Participant deleted successfully" });
  } catch (error) {
    console.error("Error deleting participant:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the participant",
      errors: error,
    });
  }
};

export const destroyParticipant = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const participant = await Participant.findOne({
      where: { id, state_participant: "Create" },
    });
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    await participant.destroy();
    return res
      .status(204)
      .json({ message: "Participant destroyed successfully" });
  } catch (error) {
    console.error("Error destroying participant:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the participant",
      errors: error,
    });
  }
};
