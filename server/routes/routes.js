const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const userController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');

//router.get('/issues', issueController.getIssues);
router.get('/issue/:username', issueController.getIssues);
router.post('/issue/:username/create', issueController.createIssue);
router.put('/issue/:id/update', issueController.updateIssue);
router.delete('/issue/:id/delete', issueController.deleteIssue);

//router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/user/create', userController.createUser);
router.put('/user/:id/update', userController.updateUser);
router.delete('/user/:id/delete', userController.deleteUser);

router.get('/project/:id', projectController.getProject);
//router.get('/projects/:id', projectController.getProjects);
router.post('/project/create', projectController.createProject);
router.put('/project/:id/update', projectController.updateProject);
router.delete('/project/:id/delete', projectController.deleteProject);

module.exports = router;
