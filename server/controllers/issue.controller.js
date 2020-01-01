const mongoose = require('mongoose');
const Issue = require('../models/issue.model').Issue;
const User = require('../models/user.model').User;

exports.createIssue = async (req, res) => {
	let issue = new Issue();

	let { userId, projectId } = req.params;
	userId = mongoose.Types.ObjectId(userId);
	projectId = mongoose.Types.ObjectId(projectId);

	const { issueType, summary, reporter, description, priority, dueDate, environment, version, status } = req.body;

	issue.summary = summary;
	issue.issueType = issueType;
	issue.version = version;
	issue.status = status;
	issue.reporter = reporter;
	issue.description = description;
	issue.priorityType = priority;
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
			if (err) return res.status(500).json({ err: err });
			return res.status(200).json({ message: 'Issue added successfully' });
		}
	);
};

exports.getIssues = (req, res) => {
	let { userId, projectId } = req.params;
	User.findOne({ _id: userId, 'projects._id': projectId }, { 'projects.$.issues': 1 }, (err, doc) => {
		if (err) res.status(500).json({ message: "Couldn't fetch issues" });

		return res.status(200).json({ result: doc });
	});
};

//Use findOneAndUpdate for arrayFilters feature in mongoose?
exports.updateIssue = (req, res) => {
	let { userId, projectId, issueId } = req.params;
	const { issueType, summary, description, priority, dueDate } = req.body;
	userId = mongoose.Types.ObjectId(userId);
	projectId = mongoose.Types.ObjectId(projectId);
	issueId = mongoose.Types.ObjectId(issueId);

	User.findOneAndUpdate(
		{ _id: userId },
		{
			$set: {
				'projects.$[i].issues.$[j].issueType': issueType,
				'projects.$[i].issues.$[j].summary': summary,
				'projects.$[i].issues.$[j].description': description,
				'projects.$[i].issues.$[j].priorityType': priority,
				'projects.$[i].issues.$[j].dueDate': dueDate
			}
		},
		{
			arrayFilters: [ { 'i._id': projectId }, { 'j._id': issueId } ]
		}
	)
		.then(function(resp) {
			console.log(resp);
			res.json({ message: 'Issue updated successfully' });
		})
		.catch(function(err) {
			console.log(err);
			res.status(500).json('Failed');
		});
};

exports.deleteIssue = (req, res) => {
	let { userId, projectId, issueId } = req.params;
	userId = mongoose.Types.ObjectId(userId);
	projectId = mongoose.Types.ObjectId(projectId);
	issueId = mongoose.Types.ObjectId(issueId);

	User.findOneAndUpdate(
		{ _id: userId, 'projects._id': projectId },
		{
			$pull: {
				'projects.$.issues': { _id: issueId }
			}
		},
		{ new: true },
		(err, doc) => {
			if (err) return res.status(500).json({ err: err });
			return res.status(200).json({ message: 'Issue deleted successfully' });
		}
	);
};
