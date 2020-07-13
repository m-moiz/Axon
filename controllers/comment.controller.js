const winston = require('../log');
const CommentRepository = require('../repositories/comment.repository');
const mongoose = require('mongoose');
const RoleAssigner = require('../roles/RoleAssigner');
const RoleRemover = require('../roles/RoleRemover');

const incNumOfComments = async (teamId, projectId, issueId) => {
	try {
		await CommentRepository.updateNumOfComments(teamId, projectId, issueId);
	} catch (err) {
		console.log(err);
		winston.log(err);
	}
};

exports.getComments = async (req, res) => {
	let { issueId } = req.params;

	try {
		const comments = await CommentRepository.getAllInIssue(issueId);
		return res.status(200).json({ comments: comments });
	} catch (err) {
		winston.log('5', err);
		console.log(err);
		return res.status(500).json({ error: 'Failed' });
	}
};

exports.createComment = async (req, res) => {
	const { issueId, userId } = req.params;
	const { projectId, teamId } = req.body;
	const id = new mongoose.Types.ObjectId();
	const fields = { ...req.params, ...req.body, id };
	const ids = { ...req.body, issueId, id };

	try {
		await CommentRepository.add(fields);
		const commentCreator = await RoleAssigner.assignCommentCreatorRole(userId, ids);
		await incNumOfComments(teamId, projectId, issueId);
		return res.status(200).json({ message: 'Comment created successfully', roles: commentCreator });
	} catch (err) {
		winston.log('5', err);
		console.log(err);
		return res.status(500).json({ message: 'Failed creating comment' });
	}
};

exports.updateComment = async (req, res) => {
	const { commentId } = req.params;
	let { commentText } = req.body;

	const comment = await CommentRepository.update(commentId, commentText);
	if (!comment) return res.status(500).json({ message: 'Failed updating comment', error: err });
	return res.status(200).json({ message: 'Comment updated successfully' });
};

exports.deleteComment = async (req, res) => {
	const { commentId } = req.params;

	try {
		await CommentRepository.delete(commentId);
		await RoleRemover.removeCommentCreatorRole(userId, commentId);
		return res.status(200).json({ message: 'Comment deleted successfully' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Failed', error: err });
	}
};
