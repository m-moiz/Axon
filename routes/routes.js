const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const userController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const commentController = require('../controllers/comment.controller');
const teamController = require('../controllers/team.controller');
const requireAuth = require('../middleware/authorization').requireAuth;

router.get('/issue/:teamId&:projectId', requireAuth, issueController.getIssues);
router.post('/issue/:teamId&:projectId/create', requireAuth, issueController.createIssue);
router.put('/issue/:teamId&:projectId&:issueId/updateBoardColumn', requireAuth, issueController.updateIssueBoardColumn);
router.put('/issue/:teamId&:projectId&:issueId/toggleStatus', requireAuth, issueController.toggleStatus);
router.put('/issue/:teamId&:projectId&:issueId/update', requireAuth, issueController.updateIssue);
router.delete('/issue/:teamId&:projectId&:issueId/delete', requireAuth, issueController.deleteIssue);

router.post('/user/findUser', requireAuth, userController.findUserWithUsername);
router.post('/user/:id/addTeam', requireAuth, userController.addTeamToUser);
router.post('/user', userController.getUser);
router.post('/user/signout', userController.handleSignOut);
router.get('/users', requireAuth, userController.getUsers);
router.post('/user/create', userController.createUser);
router.put('/user/:id/update', requireAuth, userController.updateUser);
router.delete('/user/:id/delete', requireAuth, userController.deleteUser);

router.get('/team', requireAuth, teamController.getTeam);
router.get('/teams', requireAuth, teamController.getTeams);
router.post('/team/find', requireAuth, teamController.findTeamWithTeamName);
router.post('/team/create', requireAuth, teamController.createTeam);
router.delete('/team/:teamId/delete', requireAuth, teamController.deleteTeam);

router.get('/projects/:teamId', requireAuth, projectController.getProjects);
router.get('/project/:teamId', requireAuth, projectController.getProject);
router.post('/project/:teamId/create', requireAuth, projectController.createProject);
router.put('/project/:teamId&:projectId/update', requireAuth, projectController.updateProject);
router.delete('/project/:teamId&:projectId/delete', requireAuth, projectController.deleteProject);

router.get('/comment/:issueId', requireAuth, commentController.getComments);
router.post('/comment/:issueId&:userId/create', requireAuth, commentController.createComment);
router.put('/comment/:commentId/update', requireAuth, commentController.updateComment);
router.delete('/comment/:commentId/delete', requireAuth, commentController.deleteComment);

module.exports = router;
