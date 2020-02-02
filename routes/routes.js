const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const userController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const commentController = require('../controllers/comment.controller');
const teamController = require('../controllers/team.controller');

router.get('/issue/:teamId&:projectId', issueController.getIssues);
router.post('/issue/:teamId&:projectId/create', issueController.createIssue);
router.put('/issue/:teamId&:projectId&:issueId/updateBoardColumn', issueController.updateIssueBoardColumn);
router.put('/issue/:teamId&:projectId&:issueId/toggleStatus', issueController.toggleStatus);
router.put('/issue/:teamId&:projectId&:issueId/update', issueController.updateIssue);
router.delete('/issue/:teamId&:projectId&:issueId/delete', issueController.deleteIssue);

router.post('/user/findUser', userController.findUserWithUsername);
router.post('/user/:id/addTeam', userController.addTeamToUser);
router.post('/user', userController.getUser);
router.get('/users', userController.getUsers);
router.post('/user/create', userController.createUser);
router.put('/user/:id/update', userController.updateUser);
router.delete('/user/:id/delete', userController.deleteUser);

router.get('/team', teamController.getTeam);
router.get('/teams', teamController.getTeams);
router.post('/team/find', teamController.findTeamWithTeamName);
router.post('/team/create', teamController.createTeam);
router.delete('/team/:teamId/delete', teamController.deleteTeam);
router.get('/projects/:teamId', projectController.getProjects);

//POST because: requires project name from request body
router.post('/project/:teamId', projectController.getProject);
router.post('/project/:teamId/create', projectController.createProject);
router.put('/project/:teamId&:projectId/update', projectController.updateProject);
router.delete('/project/:teamId&:projectId/delete', projectController.deleteProject);

router.get('/comment/:issueId', commentController.getComments);
router.post('/comment/:issueId&:userId/create', commentController.createComment);
router.put('/comment/:commentId/update', commentController.updateComment);
router.delete('/comment/:commentId/delete', commentController.deleteComment);

module.exports = router;
