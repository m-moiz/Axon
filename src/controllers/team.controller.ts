const Team = require('../models/team.model').Team;
const User = require('../models/user.model').User;
const mongoose = require('mongoose');

exports.getTeam = (req: Request, res: Response) => {
	let { teamId } = req.params;

	Team.find({ _id: teamId }, (err, doc) => {
		if (err) return res.status(500).json({ error: err });
		return res.status(200).json({ team: doc });
	});
};

exports.getTeams = (req: Request, res: Response) => {
	Team.find({}, { _id: 0, name: 1 }, (err, doc) => {
		if (err) return res.status(500).json({ error: err });
		doc = doc.map((item) => ({ value: item.name, label: item.name.toUpperCase() }));
		return res.status(200).json({ teams: doc });
	});
};

exports.createTeam = (req: Request, res: Response) => {
	const team = new Team();

	let { name, username, usernames } = req.body;
	usernames = usernames.map((item) => item.value);
	console.log(username, usernames);
	let id = new mongoose.Types.ObjectId();
	id = mongoose.Types.ObjectId(id);
	let allUsernames = [ username, ...usernames ];
	console.log(allUsernames);

	team.users = allUsernames;
	team._id = id;
	team.name = name;
	team.save((err, team) => {
		if (err) {
			return res.status(500).json({ message: 'Failed creating team', error: err });
		}

		User.updateMany(
			{ username: { $in: allUsernames } },
			{ $push: { 'teams.id': id, 'teams.name': name } },
			(err, user) => {
				if (err) return res.status(500).json({ message: "Couldn't update team members", error: err });
			}
		);

		return res.status(200).json({ message: 'Team created successfully', doc: team });
	});
};

exports.updateTeam = (req: Request, res: Response) => {
	const team = new Team();

	let { name, oldUsernames, newUsernames } = req.body;
};

exports.findTeamWithTeamName = (req: Request, res: Response) => {
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

exports.deleteTeam = (req: Request, res: Response) => {
	const { teamId } = req.params;
	Team.deleteOne({ _id: teamId }, (err, doc) => {
		if (err) return res.status(500).json({ message: "Couldn't delete team", error: err });

		return res.status(200).json({ message: 'Succesfully deleted team' });
	});
};
