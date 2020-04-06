const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const UserController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const commentController = require('../controllers/comment.controller');
const teamController = require('../controllers/team.controller');
const uploadController = require('../controllers/upload.controller');
const requireAuth = require('../middleware/authorization').requireAuth;

router.get('/upload/:userId', requireAuth, uploadController.upload);

router.get('/issue/:teamId&:projectId', requireAuth, issueController.getIssues);
router.post('/issue/:teamId&:projectId/create', requireAuth, issueController.createIssue);
router.put('/issue/:teamId&:projectId&:issueId/updateBoardColumn', requireAuth, issueController.updateIssueBoardColumn);
router.put('/issue/:teamId&:projectId&:issueId/toggleStatus', requireAuth, issueController.toggleStatus);
router.put('/issue/:teamId&:projectId&:issueId/update', requireAuth, issueController.updateIssue);
router.delete('/issue/:teamId&:projectId&:issueId/delete', requireAuth, issueController.deleteIssue);

router.post('/user/findUser', requireAuth, UserController.findUserWithUsername);
router.post('/user/:id/addTeam', requireAuth, UserController.addTeamToUser);
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
