import Organization from "../models/organizationModel.js";
import User from "../models/userModel.js";
import { isValidString } from "../utils/validateString.js";

const postOrganization = async (req, res) => {
  try {
    const { user_id, name, description } = req.body;

    await validateRecord(User, user_id, 'User');

    if (!isValidString(name) || !isValidString(description)) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }

    const newOrganization = await Organization.create({
      user_id,
      name,
      description,
    });
    return res
      .status(201)
      .header({ location: `/api/organizations/post?id=${newOrganization.id}` })
      .json(newOrganization);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Check if filter is required
const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll({
      include: {
        model: User,
        as: 'user'
      },
    });
    return res.status(200).json(organizations);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getOrganizationByID = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id, {
      include: {
        model: User,
        as: 'user'
      }
    });
    if (organization) {
      return res.status(200).json(organization);
    } else {
      return res.status(404).json({ error: "Organization not found...." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const patchOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, name, description } = req.body;


    const organization = await Organization.findByPk(id);

    if (!organization) {
      res.status(404).json({ error: "Organization not found" });
    }

    let userUpdated = organization.user_id;

    if ((user_id) && (!isNaN(user_id))) {
      await validateRecord(User, user_id, 'User');
      userUpdated = user_id;
    }

    const updatedOrganization = await organization.update({
      user_id: userUpdated,
      name: isValidString(name) ? name : organization.name,
      description: isValidString(description) ? description : organization.description,
    });

    return res.status(200).json(updatedOrganization);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO: Check if validation is required
const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findByPk(id);
    if (organization) {
      await organization.destroy();
      res.status(204).json({ message: "Organization deleted successfully" });
    } else {
      res.status(404).json({ error: "Organization not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

export default {
  postOrganization,
  getOrganizations,
  getOrganizationByID,
  patchOrganization,
  deleteOrganization,
};