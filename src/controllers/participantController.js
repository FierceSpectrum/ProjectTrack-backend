import Participant from "../models/participantModel.js";
import Project from "../models/projectModel.js";
import Member from "../models/memberModel.js";
import Assignment from "../models/assignmentModel.js";

export const postParticipant = async (req, res) => {
  try {
    const { project_id, member_id, assignments } = req.body;

    await validateRecord(Project, project_id, "Project");
    await validateRecord(Member, member_id, "Member");

    assignments.map(async (assignment_id) => {
      await validateRecord(Assignment, assignment_id, "Assignment");
    });

    const newParticipant = await Participant.create({
      project_id,
      member_id,
      assignments,
    });
    return res
      .status(201)
      .header({ location: `/api/participants/post?id=${newParticipant.id}` })
      .json(newParticipant);
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res
        .status(400)
        .json({ error: "You must provide an projectID..." });
    }

    const participants = await Participant.findAll({
      where: {
        project_id: projectId,
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
    });

    if (participants.length === 0) {
      return res.status(404).json({ error: "Participants not found..." });
    }

    return res.status(200).json(participants);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export const getParticipantByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format..." });
    }

    const participant = await Participant.findByPk(id, {
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
    if (participant) {
      return res.status(200).json(participant);
    } else {
      return res.status(404).json({ error: "Participant not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export const patchParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id, member_id, assignments } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format..." });
    }

    const participant = await Participant.findByPk(id);
    if (!participant) {
      return res.status(404).json({ error: "Participant not found..." });
    }

    let updates = { ...participant.toJSON() };

    if (project_id) {
      await validateRecord(Project, project_id, "Project");
      updates.project_Id = project_id;
    }

    if (member_id) {
      await validateRecord(Member, member_id, "Member");
      updates.member_id = member_id;
    }

    if (assignments && assignments.length > 0) {
      assignments.map(async (assignment_id) => {
        await validateRecord(Assignment, assignment_id, "Assignment");
      });

      updates.assignments = assignments;
    }

    const updatedParticipant = await participant.update(updates);
    return res.status(200).json(updatedParticipant);
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

// TODO: Check if validation is required
export const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByPk(id);
    if (participant) {
      await participant.destroy();
      return res
        .status(204)
        .json({ message: "Participant deleted successfully" });
    } else {
      return res.status(404).json({ error: "Participant not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};
