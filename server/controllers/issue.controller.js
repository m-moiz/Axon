const Issue = require('../models/issue.model').Issue;
const Project = require('../models/project.model').Project;

exports.createIssue = async (req, res) => {
	const issue = new Issue();

	const { projectName, issueType, summary, reporter, description, priority, dueDate, environment } = req.body;

	issue.summary = summary;
	issue.issueType = issueType;
	issue.reporter = reporter;
	issue.description = description;
	issue.priority = priority;
	issue.dueDate = dueDate;
	issue.environment = environment;

	let project = await Project.findOneAndUpdate({ name: projectName }, { issues: issue });
};

exports.getIssue = (req, res) => {};

exports.updateIssue = (req, res) => {};

exports.deleteIssue = (req, res) => {};
