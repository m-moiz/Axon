const Project = require('../models/project.model').Project;
const Team = require('../models/team.model').Team;
const mongoose = require('mongoose');

const ProjectRepository = {
  async add(id, teamId, fields, userId) {
	console.log(fields);
    // Create a new project document
    const project = new Project({
      _id: id,
      name: fields.projectName,
      team: teamId,
      manager: userId,
      description: fields.projectDesc
    });

    // Save the project
    await project.save();

    // Update the team document to add the new project
    await Team.findOneAndUpdate(
      { _id: teamId },
      { $push: { projects: project._id } }
    );
  },

  async get(ids) {
    const { teamId, projectId } = ids;
    return await Project.findOne({
      _id: projectId,
      team: teamId
    }).populate('users')
      .populate('manager');
  },

  async getByName(id, name) {
    return await Team.findOne({
      _id: id,
      'projects.name': name
    }).populate({
      path: 'projects',
      match: { name: name }
    });
  },

  async getAllByTeam(id) {
    return await Team.find({ _id: id })
      .populate({
        path: 'projects',
        select: '_id name description'
      });
  },

  async delete(ids) {
    const { teamId, projectId } = ids;
    // Delete the project
    await Project.findByIdAndDelete(projectId);

    // Update the team document to remove the deleted project
    await Team.findOneAndUpdate(
      { _id: teamId },
      { $pull: { projects: projectId } }
    );
  },

  async update(ids, fields) {
    // Update the project document
    await Project.findOneAndUpdate(
      { _id: ids.projectId },
      {
        $set: {
          name: fields.name,
          description: fields.description
        }
      }
    );
  }
};

module.exports = ProjectRepository;
