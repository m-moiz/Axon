const mongoose = require('mongoose');
const ProjectSchema = require('./project.model').ProjectSchema;

const UserSchema = mongoose.Schema({
	username: String,
	password: String,
	email: String,
	projects: { type: [ ProjectSchema ] }
});

module.exports = {
	User: mongoose.model('User', UserSchema),
	UserSchema: UserSchema
};
