const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const userController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');

//router.get('/issues', issueController.getIssues);
router.get('/issue/:userId&:projectId', issueController.getIssues);
router.post('/issue/:userId&:projectId/create', issueController.createIssue);
router.put('/issue/:userId&:projectId&:issueId/update', issueController.updateIssue);
router.delete('/issue/:userId&:projectId&:issueId/delete', issueController.deleteIssue);

//router.get('/users', userController.getUsers);
router.post('/user', userController.getUser);
router.post('/user/create', userController.createUser);
router.put('/user/:id/update', userController.updateUser);
router.delete('/user/:id/delete', userController.deleteUser);

router.get('/project/:userId', projectController.getProjects);
//router.get('/projects/:id', projectController.getProjects);
router.post('/project/:userId/create', projectController.createProject);
router.put('/project/:userId&:projectId/update', projectController.updateProject);
router.delete('/project/:userId&:projectId/delete', projectController.deleteProject);

module.exports = router;
