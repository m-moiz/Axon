const mongoose = require('mongoose');
const { UserSchema } = require('./user.model');
const { IssueSchema } = require('./issue.model');

const ProjectSchema = mongoose.Schema({
	name: { type: String, required: true },
	teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	projectMembers: { type: [ UserSchema ], default: undefined },
	description: { type: String },
	numOfIssues: { type: Number, default: 0 },
	issues: { type: [ IssueSchema ], default: undefined }
});

module.exports = {
	Project: mongoose.model('Project', ProjectSchema),
	ProjectSchema: ProjectSchema
};
