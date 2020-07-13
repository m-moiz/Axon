const mongoose = require('mongoose');
const roleTypes = require('../types/mongoose.types').roleTypes;
const permissionTypes = require('../types/mongoose.types').permissionTypes;

const RoleSchema = mongoose.Schema({
	role: { type: String, enum: roleTypes, default: 'Basic' },
	permissions: [ { type: String, enum: permissionTypes } ],
	resourceId: { type: mongoose.Schema.Types.ObjectId },
	// id's to search for deletion
	teamId: { type: mongoose.Schema.Types.ObjectId },
	projectId: { type: mongoose.Schema.Types.ObjectId },
	issueId: { type: mongoose.Schema.Types.ObjectId },
	commentId: { type: mongoose.Schema.Types.ObjectId },

	permissionId: { type: String, required: true }
});

module.exports = {
	Role: mongoose.model('Role', RoleSchema),
	RoleSchema: RoleSchema
};
