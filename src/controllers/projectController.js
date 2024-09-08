import Project from "../models/projectModel.js";
import Organization from "../models/organizationModel.js";
import State from "../models/stateModel.js";
import { isValidString } from "../utils/validateString.js";

const postProject = async (req, res) => {
  try {
    const { organization_id, state_id, name, description, repository_link } = req.body;

    await validateRecord(Organization, organization_id, 'Organization');
    await validateRecord(State, state_id, 'State');

    if ((!isValidString(name)) || (!isValidString(description))) {
      return res.status(400).json({ error: 'Invalid Data...' });
    }

    const newProject = await Project.create({
      organization_id,
      state_id,
      name,
      description,
      repository_link: repository_link ? repository_link : "",
    });

    return res
      .status(201)
      .header({ location: `/api/projects/post?id=${newProject.id}` })
      .json(newProject);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getProject = async (req, res) => {
  try {
    const { organizationId, stateId } = req.params;

    if (!organizationId) {
      return res.status(400).json({ error: 'You must provide an organizationID...' });
    }

    const filter = { organization_id: organizationId };

    // if (stateId) {
    // Filter members by role
    //   filter.state_id = stateId;
    // }

    const projects = await Project.findAll({
      where: filter,
      include: [
        {
          model: Organization,
          as: 'organzation'
        },
        {
          model: State,
          as: 'state'
        },
      ]
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const getProjectByID = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Organization,
          as: 'organzation'
        },
        {
          model: State,
          as: 'state'
        },
      ]
    });
    if (project) {
      return res.status(200).json(project);
    } else {
      return res.status(404).json({ error: "Project not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const patchProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { organization_id, state_id, name, description, repository_link } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found..." });
    }

    let projectUpdated = { ...project };

    if (organization_id) {
      await validateRecord(Organization, organization_id, 'Organization');
      projectUpdated.organization_id = organization_id;
    }

    if (state_id) {
      await validateRecord(State, state_id, 'State');
      projectUpdated.state_id = state_id;
    }

    if (isValidString(name)) {
      projectUpdated.name = name;
    }

    if (isValidString(description)) {
      projectUpdated.description = description;
    }

    if (repository_link) {
      projectUpdated.repository_link = repository_link;
    }

    const updatedProject = await project.update(projectUpdated);
    return res.status(200).json(updatedProject);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (project) {
      // TODO: Validate that the project is in state `Pending` to will be delete
      await project.destroy();
      return res.status(204).json({ message: "Project deleted" });
    } else {
      return res.status(404).json({ error: "Project not found..." });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

export default {
  postProject,
  getProject,
  getProjectByID,
  patchProject,
  deleteProject,
};