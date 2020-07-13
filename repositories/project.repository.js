const Project = require('../models/project.model').Project;
const Team = require('../models/team.model').Team;
const mongoose = require('mongoose');

const ProjectRepository = {
	async add(id, teamId, fields) {
		const project = new Project();
		project._id = id;
		project.name = fields.projectName;
		project.description = fields.projectDesc;
		project.manager = fields.userId;
		await Team.findOneAndUpdate({ _id: teamId }, { $push: { projects: project } });
	},

	async get(ids) {
		const { teamId, projectId } = ids;
		return await Team.findById({ _id, teamId, projects: { _id: projectId } });
	},

	async getByName(id, name) {
		return await Team.findOne({ _id: id, 'projects.name': name });
	},

	async getAllByTeam(id) {
		return await Team.find({ _id: id }, { 'projects._id': 1, 'projects.name': 1, 'projects.description': 1 });
	},

	async delete(ids) {
		const { teamId, projectId } = ids;
		return await Team.findByIdAndUpdate({ _id: teamId }, { $pull: { projects: { _id: projectId } } });
	},

	async update(ids, fields) {
		await Team.updateOne(
			{ _id: ids.teamId, 'projects._id': ids.projectId },
			{ $set: { 'projects.$.name': fields.name, 'projects.$.description': fields.description } }
		);
	}
};

module.exports = ProjectRepository;
