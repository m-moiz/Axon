const mongoose = require('mongoose');
const IssueSchema = require('./issue.model').IssueSchema;

const ProjectSchema = mongoose.Schema({
	name: String,
	issues: { type: [ IssueSchema ] }
});

module.exports = {
	Project: mongoose.model('Project', ProjectSchema),
	ProjectSchema: ProjectSchema
};
