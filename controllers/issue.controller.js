const mongoose = require('mongoose');
const winston = require('winston');
const IssueRepository = require('../repositories/issue.repository');
const RoleAssigner = require('../roles/RoleAssigner');
const RoleRemover = require('../roles/RoleRemover');
const UserRepository = require('../repositories/user.repository');
const validateIssue = require('../validators/validators').validateIssue;

exports.createIssue = async (req, res) => {
	let { projectId, userId } = req.params;
	const issueId = new mongoose.Types.ObjectId();
	projectId = mongoose.Types.ObjectId(projectId);

	try {
		await IssueRepository.add(req.params, req.body, issueId);
		const ids = { ...req.params, issueId };
		const issueCreator = await RoleAssigner.assignIssueCreatorRole(userId, ids);
		return res.status(200).json({ message: 'Issue added successfully', roles: issueCreator });
	} catch (err) {
		winston.log('5', err);
		console.log(err);
		return res.status(500).json({ nessage: 'Failed' });
	}
};

exports.getIssues = async (req, res) => {
	try {
		const team = await IssueRepository.getAll(req.params);
		return res.status(200).json({ result: team });
	} catch (err) {
		res.status(500).json({ message: "Couldn't fetch issues" });
	}
};

exports.getIssue = async (req, res) => {
	try {
		const issue = await IssueRepository.get(req.params);
		return res.status(200).json({ issue: issue });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Couldn't fetch issue" });
	}
};

exports.updateIssue = async (req, res) => {
	let { issueId } = req.params;

	//validateIssue(validationObject);
	issueId = mongoose.Types.ObjectId(issueId);

	try {
		await IssueRepository.update(req.params, req.body);
		return res.status(200).json({ message: 'Issue updated successfully' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Failed' });
	}
};

exports.updateIssueBoardColumn = async (req, res) => {
	const { column } = req.body;

	if (column === 'column-3') {
		try {
			await IssueRepository.updateStatus(req.params, column, 'Closed');
			return res.status(200).json({ message: 'Issue updated successfully' });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Failed' });
		}
	} else {
		try {
			await IssueRepository.updateStatus(req.params, column, 'Open');
			return res.status(200).json({ message: 'Issue updated successfully' });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Failed' });
		}
	}
};

exports.toggleStatus = async (req, res) => {
	const { prevStatus } = req.body;

	if (prevStatus === 'Open') {
		try {
			await IssueRepository.updateStatus(req.params, 'column-3', 'Closed');
			res.status(200).json({ message: 'Issue updated successfully' });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Failed' });
		}
	} else if (prevStatus === 'Closed') {
		try {
			await IssueRepository.updateStatus(req.params, 'column-1', 'Open');
			res.status(200).json({ message: 'Issue updated successfully' });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Failed' });
		}
	}
};

exports.deleteIssue = async (req, res) => {
	let { projectId, issueId, userId } = req.params;
	projectId = mongoose.Types.ObjectId(projectId);
	issueId = mongoose.Types.ObjectId(issueId);

	try {
		await IssueRepository.delete(req.params);
		return res.status(200).json({ message: 'Issue deleted successfully' });
	} catch (err) {
		winston.log('5', err);
		console.log(err);
		return res.status(500).json({ message: 'Failed' });
	}
};
