const mongoose = require('mongoose');
const IssueSchema = require('./issue.model').IssueSchema;

const ProjectSchema = mongoose.Schema({
	name: { type: String, required: true },
	teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	description: { type: String },
	numOfIssues: { type: Number, default: 0 },
	issues: { type: [ IssueSchema ], default: undefined }
});

module.exports = {
	Project: mongoose.model('Project', ProjectSchema),
	ProjectSchema: ProjectSchema
};
