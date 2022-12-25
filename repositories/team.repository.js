const { User } = require('../models/user.model');

const Team = require('../models/team.model').Team;

const TeamRepository = {
	async add(id, fields) {
		const team = new Team();
		team._id = id;
		team.name = fields.name;
		team.manager = fields.userId;
		team.users.push(fields.userId);
		await team.save();
		return team;
	},

	async get(id) {
		await Team.find({ _id: id });
	},

	async getAll() {
		return await Team.find({})
			.populate({
				path: 'users',
				select: 'username',
				model: User
			})
			.select({ _id: 1, name: 1, users: 1 });
	},

	async delete(id) {
		return await Team.findByIdAndDelete({ _id: id });
	},

	async update() {}
};

module.exports = TeamRepository;
