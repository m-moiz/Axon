const mongoose = require('mongoose');
const IssueSchema = require('./issue.model').IssueSchema;

const ProjectSchema = mongoose.Schema({
	name: { type: String, required: true },
	issues: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', default: undefined } ]
});

module.exports = {
	Project: mongoose.model('Project', ProjectSchema),
	ProjectSchema: ProjectSchema
};
