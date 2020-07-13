const User = require('../models/user.model').User;
const permissions = require('../types//types.js').permissionTypes;

const checkPermissionInUser = async (userId, resourceId, permission) => {
	return await User.find({ _id: userId, 'roles.resourceId': resourceId, 'roles.permissions': permission });
};

exports.requireIssueCreationPermission = async (req, res, next) => {
	const { userId, projectId } = req.params;
	const permission = permissions.CAN_CREATE_ISSUES;
	const found = await checkPermissionInUser(userId, projectId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireIssueModificationPermission = async (req, res, next) => {
	const { userId, issueId } = req.params;
	const permission = permissions.CAN_EDIT_ISSUE;
	const found = await checkPermissionInUser(userId, issueId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireIssueDeletionPermission = async (req, res, next) => {
	const { userId, issueId } = req.params;
	const permission = permissions.CAN_DELETE_ISSUE;
	const found = await checkPermissionInUser(userId, issueId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireProjectCreationPermission = async (req, res, next) => {
	const { userId, teamId } = req.params;
	const permission = permissions.CAN_CREATE_PROJECTS;
	const found = await checkPermissionInUser(userId, teamId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireProjectModificationPermission = async (req, res, next) => {
	const { userId, projectId } = req.params;
	const permission = permissions.CAN_EDIT_PROJECT;
	const found = await checkPermissionInUser(userId, projectId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireProjectDeletionPermission = async (req, res, next) => {
	const { userId, projectId } = req.params;
	const permission = permissions.CAN_DELETE_PROJECT;
	const found = await checkPermissionInUser(userId, projectId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireCommentCreationPermission = async (req, res, next) => {
	const { userId, issueId } = req.params;
	const permission = permissions.CAN_CREATE_COMMENTS;
	const found = await checkPermissionInUser(userId, issueId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireCommentModificationPermission = async (req, res, next) => {
	const { userId, commentId } = req.params;
	const permission = permissions.CAN_EDIT_COMMENT;
	const found = await checkPermissionInUser(userId, commentId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireCommentDeletionPermission = async (req, res, next) => {
	const { userId, commentId } = req.params;
	const permission = permissions.CAN_DELETE_COMMENT;
	const found = await checkPermissionInUser(userId, commentId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};

exports.requireTeamDeletionPermission = async (req, res, next) => {
	const { userId, teamId } = req.params;
	const permission = permissions.CAN_DELETE_TEAM;
	const found = await checkPermissionInUser(userId, teamId, permission);

	if (!found) {
		res.status(403).message('Unauthorized');
	}

	next();
};
