const User = require('../models/user.model').User;

const UserRepository = {
	async add(fields, hash) {
		const user = new User();
		user.username = fields.username;
		user.email = fields.email;
		user.password = hash;
		await user.save();
		return user;
	},

	async delete(id) {
		await User.deleteOne({ _id: id });
	},

	async get(username) {
		return await User.findOne({ username });
	},

	async getById(userId) {
		return await User.findOne({ _id: userId });
	},

	async getAll() {},

	async update(id) {
		await User.updateOne({ _id: id });
	}
};

module.exports = UserRepository;
