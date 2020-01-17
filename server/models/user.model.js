const mongoose = require('mongoose');

const SubSchema = mongoose.Schema({
	teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	name: { type: String, required: false }
});

const UserSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	teams: [ SubSchema ],
	isTeamAdmin: { type: mongoose.Schema.Types.Boolean, default: false },
	githubId: { type: String, required: false }
});

module.exports = {
	User: mongoose.model('User', UserSchema),
	UserSchema: UserSchema
};
