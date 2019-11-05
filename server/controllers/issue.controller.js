const Issue = require('../models/issue.model').Issue;
const User = require('../models/user.model').User;
const Project = require('../models/project.model').Project;

exports.createIssue = async (req, res) => {
	const issue = new Issue();

	const { username } = req.params;

	const { projectName, issueType, summary, reporter, description, priority, dueDate, environment } = req.body;

	issue.summary = summary;
	issue.issueType = issueType;
	issue.reporter = reporter;
	issue.description = description;
	issue.priority = priority;
	issue.dueDate = dueDate;
	issue.environment = environment;

	User.findOne({ username });
};

exports.getIssue = (req, res) => {
	const { username, projectName } = req.params;
};

exports.updateIssue = (req, res) => {};

exports.deleteIssue = (req, res) => {};
