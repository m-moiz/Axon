const Router = require('express-promise-router');
const issueController = require('../controllers/issue.controller');
const UserController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const commentController = require('../controllers/comment.controller');
const teamController = require('../controllers/team.controller');
const imageController = require('../controllers/image.controller');
const {getIssue, getIssues, createIssue, createProject, createTeam, createUser, getProject, getProjects, getTeam, getTeams, getUser, getUsers, updateIssue, updateIssueBoardColumn, updateProject, updateUser, toggleStatus, deleteIssue, deleteProject, deleteTeam, deleteUser, findTeamWithTeamName, handleSignOut, findUserWithUsername, getComments, createComment, updateComment, deleteComment} = require('../routes/urls');
const permissions = require('../middleware/permissions');
const requireAuth = require('../middleware/authorization').requireAuth;

const router = new Router();

router.get('/image/:userId', requireAuth, imageController.upload);

router.get(getIssues, requireAuth, issueController.getIssues);

router.get(getIssue, requireAuth, issueController.getIssue);

router.post(
	createIssue,
	requireAuth,
	issueController.createIssue
);

router.put(
	updateIssueBoardColumn,
	issueController.updateIssueBoardColumn
);

router.put(
	toggleStatus,
	requireAuth,
	issueController.toggleStatus
);

router.put(
	updateIssue,
	requireAuth,
	issueController.updateIssue
);

router.delete(
	deleteIssue,
	requireAuth,
	issueController.deleteIssue
);

router.post(findUserWithUsername, UserController.findUserWithUsername);

router.post(getUser, UserController.getUser);

router.post(handleSignOut, UserController.handleSignOut);

router.get(getUsers, requireAuth, UserController.getUsers);

router.post(createUser, UserController.createUser);

router.put(updateUser, requireAuth, UserController.updateUser);

router.delete(deleteUser, requireAuth, UserController.deleteUser);

router.get(getTeam, requireAuth, teamController.getTeam);

router.get(getTeams, requireAuth, teamController.getTeams);

router.post(findTeamWithTeamName, requireAuth, teamController.findTeamWithTeamName);

router.post(createTeam, requireAuth, teamController.createTeam);

router.delete(
	deleteTeam,
	requireAuth,
	teamController.deleteTeam
);

router.get(getProjects, requireAuth, projectController.getProjects);

router.get(getProject, requireAuth, projectController.getProject);

router.post(
	createProject,
	requireAuth,
	projectController.createProject
);

router.put(
	updateProject,
	requireAuth,
	projectController.updateProject
);

router.delete(
	deleteProject,
	requireAuth,
	projectController.deleteProject
);

router.get(getComments, requireAuth, commentController.getComments);

router.post(
	createComment,
	requireAuth,
	commentController.createComment
);

router.put(updateComment, requireAuth, commentController.updateComment);

router.delete(
	deleteComment,
	requireAuth,
	commentController.deleteComment
);


module.exports = router;
