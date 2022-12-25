const Team = require('../models/team.model').Team;
const mongoose = require('mongoose');
const RoleAssigner = require('../roles/RoleAssigner');
const RoleRemover = require('../roles/RoleRemover');
const ProjectRepository = require('../repositories/project.repository');
const UserRepository = require('../repositories/user.repository');

exports.createProject = async (req, res) => {
	const { teamId, userId } = req.params;
	const { projectName } = req.body;

	let id = new mongoose.Types.ObjectId();
	id = mongoose.Types.ObjectId(id);

	const result = await Team.findOne({ _id: teamId, 'projects.name': projectName });
	if (result === null) {
		try {
			await ProjectRepository.add(id, teamId, req.body, userId);
			const ids = { teamId, id };
			console.log(ids);
			const [ projectManager, projectMember ] = await RoleAssigner.assignProjectManagerRole(userId, ids);
			return res
				.status(200)
				.json({ message: 'Successfully created project', roles: [ projectManager, projectMember ] });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: "Couldn't create project" });
		}
	}
};

exports.getProjects = async (req, res) => {
	const { teamId } = req.params;
	const projects = await ProjectRepository.getAllByTeam(teamId);
	return res.status(200).json({ result: projects });
};

exports.getProject = async (req, res) => {
	const { teamId } = req.params;
	const { projectName } = req.body;

	const team = await ProjectRepository.getByName(teamId, projectName);
	if (!team) return res.status(200).json({ message: 'Project not found' });
	if (team) return res.status(200).json({ message: 'Project already exists' });
};

exports.updateProject = async (req, res) => {
	try {
		await ProjectRepository.update(req.params, req.body);
		return res.status(200).json({ message: 'Project updated successfully' });
	} catch (err) {
		winson.log(err);
		console.log(err);
		return res.status(500).json({ error: err });
	}
};

exports.deleteProject = async (req, res) => {
	const { userId, projectId } = req.params;

	const team = await ProjectRepository.delete(req.params);
	if (!team) return res.status(500).json({ message: "Couldn't delete project" });
	return res.status(200).json({ message: 'Successfully deleted project' });
};
