import Member from "../models/memberModel.js";
import Organization from "../models/organizationModel.js";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import { validateRecord } from "../utils/validateRecord.js";

export const postMember = async (req, res) => {
  try {
    const { organization_id, user_id, role_id } = req.body;

    // Validate existence of organization, user, and role
    await validateRecord(Organization, organization_id, "Organization");
    await validateRecord(User, user_id, "User");
    await validateRecord(Role, role_id, "Role");

    const newMember = await Member.create({
      organization_id,
      user_id,
      role_id,
    });
    return res
      .status(201)
      .header({ location: `/api/members/post?id=${newMember.id}` })
      .json(newMember);
  } catch (error) {
    // Distinguish between validation and internal errors
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export const getMembers = async (req, res) => {
  try {
    const { organizationId, roleId } = req.params;

    if (!organizationId) {
      return res
        .status(400)
        .json({ error: "You must provide an organizationID..." });
    }

    const filter = { organization_id: organizationId };

    if (roleId) {
      // Filter members by role
      filter.role_id = roleId;
    }

    // TODO: Añadir el `include`
    const members = await Member.findAll({
      where: filter,
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

    if (members.length === 0) {
      return res.status(404).json({ error: "Members not found..." });
    }

    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export const getMemberByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format..." });
    }

    const member = await Member.findByPk(id, {
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
    if (member) {
      return res.status(200).json(member);
    } else {
      return res.status(404).json({ error: "Member not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

export const patchMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { organization_id, user_id, role_id } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format..." });
    }

    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ error: "Member not found..." });
    }

    let updates = { ...member.toJSON() };

    if (organization_id) {
      await validateRecord(Organization, organization_id, "Organization");
      updates.organization_id = organization_id;
    }

    if (user_id) {
      await validateRecord(User, user_id, "User");
      updates.user_id = user_id;
    }

    if (role_id) {
      await validateRecord(Role, role_id, "Role");
      updates.role_id = role_id;
    }

    const updatedMember = await member.update(updates);
    return res.status(200).json(updatedMember);
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Something went wrong..." });
  }
};

// TODO: Check if validation is required
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id);
    if (member) {
      await member.destroy();
      return res.status(204).json({ message: "Member deleted successfully" });
    } else {
      return res.status(404).json({ error: "Member not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong..." });
  }
};
