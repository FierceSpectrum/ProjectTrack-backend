import Organization from "../models/organizationModel.js";
import User from "../models/userModel.js";
import { isValidString } from "../utils/validate/string.js";

export const postOrganization = async (req, res) => {
  try {
    const { user_id, name, description } = req.body;

    await validateRecord(User, user_id, "User");

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

    const newOrganization = await Organization.create({
      user_id,
      name,
      description,
    });
    return res
      .status(201)
      .header({ location: `/api/organizations/${newOrganization.id}` })
      .json({
        message: "Organization created successfully",
        organizationId: newOrganization.id,
      });
  } catch (error) {
    console.error("Error creating organization:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while creating the organization",
      errors: error,
    });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    // TODO: Then correct where I get the user id
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "You must provide an userId..." });
    }

    const organizations = await Organization.findAll({
      where: { user_id: userId, state_organization: "Created" },
      include: {
        model: User,
        as: "user",
      },
      order: [["id", "ASC"]],
    });
    return res.status(200).json(organizations);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching organizations",
      errors: error,
    });
  }
};

export const getOrganizationByID = async (req, res) => {
  try {
    const { id, userId } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const organization = await Organization.findOne({
      where: { id, user_id: userId, state_organization: "Created" },
      include: {
        model: User,
        as: "user",
      },
    });
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    return res.status(200).json(organization);
  } catch (error) {
    console.error("Error fetching organization by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the organization",
      errors: error,
    });
  }
};

export const patchOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const { user_id, name, description } = req.body;

    const organization = await Organization.findOne({
      where: { id, state_organization: "Created" },
    });

    if (!organization) {
      res.status(404).json({ message: "Organization not found" });
    }

    const updatedOrganization = {};
    const updateField = (field, value, validator) => {
      if (value && validator(value) && value !== organization[field]) {
        updatedOrganization[field] = value;
      }
    };

    if (user_id) {
      await validateRecord(User, user_id, "User");
      updatedOrganization["user_id"] = user_id;
    }

    updateField("name", name, isValidString);
    updateField("description", description, isValidString);

    if (Object.keys(updatedOrganization).length > 0) {
      await organization.update(updatedOrganization);
      return res
        .status(200)
        .json({ message: "Organization updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating organization:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while updating the organization",
      errors: error,
    });
  }
};

export const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const organization = await Organization.findOne({
      where: { id, state_organization: "Create" },
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    await organization.update({ state_organization: "Delete" });
    return res.status(204).json({ message: "Organization deleted successfully" });
  } catch (error) {
    console.error("Error deleting organization:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the organization",
      errors: error,
    });
  }
};

export const destroyOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const organization = await Organization.findOne({
      where: { id, state_organization: "Delete" },
    });
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    await organization.destroy();
    return res
      .status(204)
      .json({ message: "Organization destroyed successfully" });
  } catch (error) {
    console.error("Error destroying organization:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the organization",
      errors: error,
    });
  }
};
