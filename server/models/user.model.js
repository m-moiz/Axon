const mongoose = require('mongoose');
const ProjectSchema = require('./project.model').ProjectSchema;

const UserSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	projects: { type: [ ProjectSchema ], default: undefined }
});

module.exports = {
	User: mongoose.model('User', UserSchema),
	UserSchema: UserSchema
};
