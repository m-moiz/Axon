const Router = require('express-promise-router');
const issueController = require('../controllers/issue.controller');
const UserController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const commentController = require('../controllers/comment.controller');
const teamController = require('../controllers/team.controller');
const imageController = require('../controllers/image.controller');
const permissions = require('../middleware/permissions');
const requireAuth = require('../middleware/authorization').requireAuth;

const router = new Router();

router.get('/image/:userId', requireAuth, imageController.upload);

router.get('/issues/:teamId&:projectId', requireAuth, issueController.getIssues);

router.get('/issue/:teamId&:projectId&:issueId', requireAuth, issueController.getIssue);

router.post(
	'/issue/:teamId&:projectId&:userId/create',
	requireAuth,
	issueController.createIssue
);

router.put(
	'/issue/:teamId&:projectId&:issueId&:userId/updateBoardColumn',
	issueController.updateIssueBoardColumn
);

router.put(
	'/issue/:teamId&:projectId&:issueId&:userId/toggleStatus',
	requireAuth,
	issueController.toggleStatus
);

router.put(
	'/issue/:teamId&:projectId&:issueId&:userId/update',
	requireAuth,
	issueController.updateIssue
);

router.delete(
	'/issue/:teamId&:projectId&:issueId&:userId/delete',
	requireAuth,
	issueController.deleteIssue
);

router.post('/user/findUser', UserController.findUserWithUsername);

router.post('/user', UserController.getUser);

router.post('/user/signout', UserController.handleSignOut);

router.get('/users', requireAuth, UserController.getUsers);

router.post('/user/create', UserController.createUser);

router.put('/user/:id/update', requireAuth, UserController.updateUser);

router.delete('/user/:id/delete', requireAuth, UserController.deleteUser);

router.get('/team', requireAuth, teamController.getTeam);

router.get('/teams', requireAuth, teamController.getTeams);

router.post('/team/find', requireAuth, teamController.findTeamWithTeamName);

router.post('/team/create', requireAuth, teamController.createTeam);

router.delete(
	'/team/:teamId&:userId/delete',
	requireAuth,
	teamController.deleteTeam
);

router.get('/projects/:teamId', requireAuth, projectController.getProjects);

router.get('/project/:teamId', requireAuth, projectController.getProject);

router.post(
	'/project/:teamId&:userId/create',
	requireAuth,
	projectController.createProject
);

router.put(
	'/project/:teamId&:projectId&:userId/update',
	requireAuth,
	projectController.updateProject
);

router.delete(
	'/project/:teamId&:projectId&:userId/delete',
	requireAuth,
	projectController.deleteProject
);

router.get('/comment/:issueId', requireAuth, commentController.getComments);

router.post(
	'/comment/:issueId&:userId/create',
	requireAuth,
	commentController.createComment
);

router.put('/comment/:commentId/update', requireAuth, commentController.updateComment);

router.delete(
	'/comment/:commentId&:userId/delete',
	requireAuth,
	commentController.deleteComment
);

module.exports = router;
