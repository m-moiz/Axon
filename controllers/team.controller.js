const Team = require('../models/team.model').Team;
const RoleAssigner = require('../roles/RoleAssigner');
const RoleRemover = require('../roles/RoleRemover');
const mongoose = require('mongoose');
const winston = require('winston');
const TeamRepository = require('../repositories/team.repository');
const UserRepository = require('../repositories/user.repository');

exports.getTeam = async (req, res) => {
	const { teamId } = req.params;
	try {
		const team = await TeamRepository.get(teamId);
		return res.status(200).json({ team: team });
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.getTeams = async (req, res) => {
	try {
		let teams = await TeamRepository.getAll();
		teams = teams.map((team) => ({ value: team.name, label: team.name.toUpperCase(), id: team._id, users: team.users}));
		return res.status(200).json({ teams: teams });
	} catch (err) {
		console.log(err);
		winston.log(err);
		return res.status(500).json({ error: 'Failed' });
	}
};

exports.createTeam = async (req, res) => {
	let { name, username, usernames, userId } = req.body;

	let id = new mongoose.Types.ObjectId();
	id = mongoose.Types.ObjectId(id);

	try {
		const team = await TeamRepository.add(id, req.body);
		const [ teamManager, teamMember ] = await RoleAssigner.assignTeamManagerRole(userId, id);
		return res
			.status(200)
			.json({ message: 'Team created successfully', doc: team, roles: [ teamManager, teamMember ] });
	} catch (err) {
		winston.log(err);
		console.log(err);
		return res.status(500).json({ error: 'Failed' });
	}
};

exports.updateTeam = (req, res) => {
	const team = new Team();

	let { name, oldUsernames, newUsernames } = req.body;
};

exports.findTeamWithTeamName = (req, res) => {
	const { name } = req.body;
	Team.find({ name: name }, (err, doc) => {
		if (doc.length > 0) {
			return res.status(200).json({ message: 'Team name already exists' });
		}

		if (doc.length === 0) {
			return res.status(200).json({ message: 'Team not found' });
		}
	});
};

exports.deleteTeam = async (req, res) => {
	const { userId, teamId } = req.params;
	try {
		const team = await TeamRepository.delete(teamId);
		return res.status(200).json({ message: 'Succesfully deleted team' });
	} catch (err) {
		return res.status(500).json({ message: "Couldn't delete team", error: err });
	}
};
