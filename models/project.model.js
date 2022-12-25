const mongoose = require('mongoose');
const { UserSchema } = require('./user.model');
const { IssueSchema } = require('./issue.model');

const ProjectSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	name: { type: String, required: true },
	team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
	manager: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	projectMembers: { type: [ UserSchema ], default: undefined },
	description: { type: String },
	numOfIssues: { type: Number, default: 0 },
	issues: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'Issue', default: undefined }
});

module.exports = {
	Project: mongoose.model('Project', ProjectSchema),
	ProjectSchema: ProjectSchema
};
