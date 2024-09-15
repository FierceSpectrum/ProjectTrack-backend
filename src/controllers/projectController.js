import Project from "../models/projectModel.js";
import Organization from "../models/organizationModel.js";
import State from "../models/stateModel.js";
import { isValidString } from "../utils/validate/string.js";
import { isValidUrl } from "../utils/validate/link.js";

export const postProject = async (req, res) => {
  try {
    const { organization_id, state_id, name, description, repository_link } =
      req.body;

    await validateRecord(Organization, organization_id, "Organization");
    await validateRecord(State, state_id, "State");

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
      {
        field: "repository_link",
        value: repository_link,
        validator: isValidUrl,
        message: "The repository link is invalid or empty",
      },
    ];

    for (const { field, value, validator, message } of validations) {
      if (!value || !validator(value)) {
        return res.status(400).json({ message });
      }
    }

    const newProject = await Project.create({
      organization_id,
      state_id,
      name,
      description,
      repository_link: repository_link && repository_link,
    });

    return res
      .status(201)
      .header({ location: `/api/projects/${newProject.id}` })
      .json({
        message: "Project created successfully",
        projectId: newProject.id,
      });
  } catch (error) {
    console.error("Error creating project:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while creating the project",
      errors: error,
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      return res
        .status(400)
        .json({ message: "You must provide an organizationID" });
    }

    const projects = await Project.findAll({
      where: { organization_id: organizationId, state_project: "Create" },
      include: [
        {
          model: Organization,
          as: "organzation",
        },
        {
          model: State,
          as: "state",
        },
      ],
      order: [["id", "ASC"]],
    });
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching projects",
      errors: error,
    });
  }
};

export const getProjectByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const project = await Project.findOne({
      where: { id, state_project: "Create" },
      include: [
        {
          model: Organization,
          as: "organzation",
        },
        {
          model: State,
          as: "state",
        },
      ],
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the project",
      errors: error,
    });
  }
};

export const patchProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { organization_id, state_id, name, description, repository_link } =
      req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const project = await Project.findOne({
      where: { id, state_project: "Create" },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let updatedProject = {};
    const updateField = (field, value, validator) => {
      if (value && validator(value) && value !== project[field]) {
        updatedProject[field] = value;
      }
    };

    if (organization_id) {
      await validateRecord(Organization, organization_id, "Organization");
      updatedProject["organization_id"] = organization_id;
    }

    if (state_id) {
      await validateRecord(State, state_id, "State");
      updatedProject["state_id"] = state_id;
    }

    updateField("name", name, isValidString);
    updateField("description", description, isValidString);
    updateField("repository_link", repository_link, isValidUrl);

    if (Object.keys(updatedProject).length > 0) {
      await project.update(updatedProject);
      return res.status(200).json({ message: "Project updated successfully" });
    } else {
      return res.status(304).json({ message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating project:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: "Something went wrong while updating the project",
      errors: error,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const project = await Project.findOne({
      where: { id, state_project: "Create" },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.update({ state_project: "Delete" });
    return res.status(204).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the project",
      errors: error,
    });
  }
};

export const destroyProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const project = await Project.findOne({
      where: { id, state_project: "Create" },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();
    return res.status(204).json({ message: "Project destroyed successfully" });
  } catch (error) {
    console.error("Error destroying project:", error);
    return res.status(500).json({
      message: "Something went wrong while destroying the project",
      errors: error,
    });
  }
};
