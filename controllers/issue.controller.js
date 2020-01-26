const mongoose = require('mongoose');
const Issue = require('../models/issue.model').Issue;
const Team = require('../models/team.model').Team;
const validateIssue = require('../validators/validators').validateIssue;

exports.createIssue = async (req, res) => {
	let issue = new Issue();

	let { teamId, projectId } = req.params;
	teamId = mongoose.Types.ObjectId(teamId);
	projectId = mongoose.Types.ObjectId(projectId);

	const {
		createdBy,
		issueType,
		reporter,
		status,
		summary,
		description,
		priorityType,
		dueDate,
		environment,
		version
	} = req.body;

	const validationObject = {
		createdBy: createdBy,
		issueType: issueType,
		reporter: reporter,
		status: status,
		summary: summary,
		description: description,
		priorityType: priorityType,
		dueDate: dueDate,
		environment: environment,
		version: version
	};

	/*

	const [ isInvalid, error ] = validateIssue(validationObject);

	if (isInvalid) {
		return res.status(500).json({ error: error });
	}

	*/

	issue.createdBy = createdBy;
	issue.summary = summary;
	issue.issueType = issueType;
	issue.version = version;
	issue.status = status;
	issue.reporter = reporter;
	issue.description = description;
	issue.priorityType = priorityType;
	issue.dueDate = dueDate;
	issue.environment = environment;

	Team.findOneAndUpdate(
		{ _id: teamId, 'projects._id': projectId },
		{
			$push: {
				'projects.$.issues': issue
			}
		},
		(err) => {
			if (err) return res.status(500).json({ err: err });
			return res.status(200).json({ message: 'Issue added successfully' });
		}
	);
};

exports.getIssues = (req, res) => {
	let { teamId, projectId } = req.params;
	Team.findOne({ _id: teamId, 'projects._id': projectId }, { 'projects.$.issues': 1 }, (err, doc) => {
		if (err) res.status(500).json({ message: "Couldn't fetch issues" });

		return res.status(200).json({ result: doc });
	});
};

//Use findOneAndUpdate for arrayFilters feature in mongoose?
exports.updateIssue = (req, res) => {
	let { teamId, projectId, issueId } = req.params;
	const { issueType, reporter, status, summary, description, priorityType, dueDate, environment, version } = req.body;
	const validationObject = {
		createdBy: createdBy,
		issueType: issueType,
		reporter: reporter,
		status: status,
		summary: summary,
		description: description,
		priorityType: priorityType,
		dueDate: dueDate,
		environment: environment,
		version: version
	};

	validateIssue(validationObject);
	teamId = mongoose.Types.ObjectId(teamId);
	projectId = mongoose.Types.ObjectId(projectId);
	issueId = mongoose.Types.ObjectId(issueId);

	Team.findOneAndUpdate(
		{ _id: teamId },
		{
			$set: {
				'projects.$[i].issues.$[j].issueType': issueType,
				'projects.$[i].issues.$[j].summary': summary,
				'projects.$[i].issues.$[j].reporter': reporter,
				'projects.$[i].issues.$[j].description': description,
				'projects.$[i].issues.$[j].priorityType': priorityType,
				'projects.$[i].issues.$[j].dueDate': dueDate,
				'projects.$[i].issues.$[j].environment': environment,
				'projects.$[i].issues.$[j].status': status,
				'projects.$[i].issues.$[j].version': version
			}
		},
		{
			arrayFilters: [ { 'i._id': projectId }, { 'j._id': issueId } ]
		}
	)
		.then(() => {
			return res.status(200).json({ message: 'Issue updated successfully' });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json('Failed');
		});
};

exports.updateIssueBoardColumn = (req, res) => {
	let { teamId, projectId, issueId } = req.params;
	let { column } = req.body;

	if (column === 'column-3') {
		Team.findOneAndUpdate(
			{ _id: teamId },
			{
				$set: {
					'projects.$[i].issues.$[j].boardColumn': column,
					'projects.$[i].issues.$[j].status': 'Closed'
				}
			},
			{
				arrayFilters: [ { 'i._id': projectId }, { 'j._id': issueId } ]
			}
		)
			.then(() => {
				res.status(200).json({ message: 'Issue updated successfully' });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json('Failed');
			});
	} else {
		Team.findOneAndUpdate(
			{ _id: teamId },
			{
				$set: {
					'projects.$[i].issues.$[j].boardColumn': column,
					'projects.$[i].issues.$[j].status': 'Open'
				}
			},
			{
				arrayFilters: [ { 'i._id': projectId }, { 'j._id': issueId } ]
			}
		)
			.then(() => {
				res.status(200).json({ message: 'Issue updated successfully' });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json('Failed');
			});
	}
};

exports.deleteIssue = (req, res) => {
	let { teamId, projectId, issueId } = req.params;
	teamId = mongoose.Types.ObjectId(teamId);
	projectId = mongoose.Types.ObjectId(projectId);
	issueId = mongoose.Types.ObjectId(issueId);

	Team.findOneAndUpdate(
		{ _id: teamId, 'projects._id': projectId },
		{
			$pull: {
				'projects.$.issues': { _id: issueId }
			}
		},
		{ new: true },
		(err) => {
			if (err) return res.status(500).json({ err: err });
			return res.status(200).json({ message: 'Issue deleted successfully' });
		}
	);
};
