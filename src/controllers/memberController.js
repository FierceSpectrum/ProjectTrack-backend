import Member from "../models/memberModel.js";
import Organization from "../models/organizationModel.js";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import { validateRecord } from "../utils/validate/record.js";

export const postMember = async (req, res) => {
  try {
    const { organization_id, user_id, role_id } = req.body;

    // Validate existence of organization, user, and role
    await validateRecord(Organization, organization_id, "Organization");
    await validateRecord(User, user_id, "User");
    await validateRecord(Role, role_id, "Role");

    const existingMember = await Member.findOne({
      where: {
        user_id,
        organization_id,
      },
    });

    if (existingMember) {
      return res.status(400).json({
        message: "This user is already a member of this organization.",
      });
    }

    const newMember = await Member.create({
      organization_id,
      user_id,
      role_id,
    });
    return res
      .status(201)
      .header({ location: `/api/members/${newMember.id}` })
      .json({
        message: "Member created successfully",
        memberId: newMember.id,
      });
  } catch (error) {
    console.error("Error creating member:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while creating the member",
      errors: error,
    });
  }
};

export const getMembers = async (req, res) => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      return res
        .status(400)
        .json({ message: "You must provide an organizationID..." });
    }

    const members = await Member.findAll({
      where: { organization_id: organizationId, state_member: "Create" },
      include: [
        {
          model: Organization,
          as: "organzation",
        },
        {
          model: User,
          as: "user",
        },
        {
          model: Role,
          as: "role",
        },
      ],
      order: [["id", "ASC"]],
    });

    return res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching members",
      errors: error,
    });
  }
};

export const getMemberByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const member = await Member.findOne({
      where: { id, state_member: "Created" },
      include: [
        {
          model: Organization,
          as: "organzation",
        },
        {
          model: User,
          as: "user",
        },
        {
          model: Role,
          as: "role",
        },
      ],
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json(member);
  } catch (error) {
    console.error("Error fetching member by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the member",
      errors: error,
    });
  }
};

export const patchMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { organization_id, user_id, role_id } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const member = await Member.findOne({
      where: { id, state_member: "Created" },
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    let updatedMember = {};

    if (organization_id) {
      await validateRecord(Organization, organization_id, "Organization");
      updatedMember["organization_id"] = organization_id;
    }

    if (user_id) {
      await validateRecord(User, user_id, "User");
      updatedMember["user_id"] = user_id;
    }

    if (role_id) {
      await validateRecord(Role, role_id, "Role");
      updatedMember["role_id"] = role_id;
    }

    if (Object.keys(updatedMember).length > 0) {
      await member.update(updatedMember);
      return res.status(200).json({ message: "Member updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating member:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while updating the member",
      errors: error,
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const member = await Member.findOne({
      where: { id, state_member: "Create" },
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await member.update({ state_member: "Delete" });
    return res.status(204).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the member",
      errors: error,
    });
  }
};

export const destroyMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const member = await Member.findOne({
      where: { id, state_member: "Delete" },
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await member.destroy();
    return res
      .status(204)
      .json({ message: "Member destroyed successfully" });
  } catch (error) {
    console.error("Error destroying member:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the member",
      errors: error,
    });
  }
};
