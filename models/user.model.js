const mongoose = require('mongoose');
const RoleSchema = require('./role.model').RoleSchema;

const UserSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	assigned: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'Issue', default: undefined },
	roles: [ RoleSchema ],
	githubId: { type: String, required: false }
});

module.exports = {
	User: mongoose.model('User', UserSchema),
	UserSchema: UserSchema
};
