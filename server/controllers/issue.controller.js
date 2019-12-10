const mongoose = require('mongoose');
const Issue = require('../models/issue.model').Issue;
const User = require('../models/user.model').User;
const Project = require('../models/project.model').Project;

exports.createIssue = async (req, res) => {
	const issue = new Issue();

	let { userId, projectId } = req.params;
	userId = mongoose.Types.ObjectId(userId);
	projectId = mongoose.Types.ObjectId(projectId);

	const { issueType, summary, reporter, description, priority, dueDate, environment } = req.body;

	issue.summary = summary;
	issue.issueType = issueType;
	issue.reporter = reporter;
	issue.description = description;
	issue.priority = priority;
	issue.dueDate = dueDate;
	issue.environment = environment;

	User.findOneAndUpdate(
		{ _id: userId, 'projects._id': projectId },
		{
			$push: {
				'projects.$.issues': issue
			}
		},
		(err, doc) => {
			if (err) return res.status(404).json({ err: err });
			return res.status(200).json({ user: doc });
		}
	);
};

exports.getIssues = (req, res) => {
	let { userId, projectId } = req.params;
	User.findOne({ _id: userId, 'projects._id': projectId }, 'projects.issues').lean().exec((err, doc) => {
		if (err) return res.status(404).json({ err: err });
		return res.status(200).json({ user: doc });
	});
};

exports.updateIssue = (req, res) => {
	const issue = new Issue();
	const { userId, projectId, issueId } = req.params;
	userId = mongoose.Types.ObjectId(userId);
	projectId = mongoose.Types.ObjectId(projectId);

	User.findOneAndUpdate(
		{ _id: userId, 'projects._id': projectId, 'projects.$.issues._id': issueId },
		{
			$set: {
				'projects.$.issues.$': issue
			}
		},
		(err, doc) => {
			if (err) return res.status(404).json({ err: err });
			return res.status(200).json({ user: doc });
		}
	);
};

exports.deleteIssue = (req, res) => {
	const { userId, projectId, issueId } = req.params;
	userId = mongoose.Types.ObjectId(userId);
	projectId = mongoose.Types.ObjectId(projectId);

	User.findOneAndUpdate(
		{ _id: userId, 'projects._id': projectId },
		{
			$pull: {
				'projects.$.issues._id': issueId
			}
		},
		(err, doc) => {
			if (err) return res.status(404).json({ err: err });
			return res.status(200).json({ user: doc });
		}
	);
};
