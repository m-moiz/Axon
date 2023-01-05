const Router = require('express-promise-router');
const issueController = require('../controllers/issue.controller');
const UserController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const commentController = require('../controllers/comment.controller');
const teamController = require('../controllers/team.controller');
const imageController = require('../controllers/image.controller');
const {getIssue, getIssues, createIssue, createProject, createTeam, createUser, getProject, getProjects, getTeam, getTeams, getUser, getUsers, updateIssue, updateIssueBoardColumn, updateProject, updateUser, toggleStatus, deleteIssue, deleteProject, deleteTeam, deleteUser, findTeamWithTeamName, handleSignOut, findUserWithUsername, getComments, createComment, updateComment, deleteComment} = require('../routes/urls');

const router = new Router();

router.get('/image/:userId', imageController.upload);

router.get(getIssues, issueController.getIssues);

router.get(getIssue, issueController.getIssue);

router.post(
	createIssue,
	issueController.createIssue
);

router.put(
	updateIssueBoardColumn,
	issueController.updateIssueBoardColumn
);

router.put(
	toggleStatus,
	issueController.toggleStatus
);

router.put(
	updateIssue,
	issueController.updateIssue
);

router.delete(
	deleteIssue,
	issueController.deleteIssue
);

router.post(findUserWithUsername, UserController.findUserWithUsername);

router.post(getUser, UserController.getUser);

router.post(handleSignOut, UserController.handleSignOut);

router.get(getUsers, UserController.getUsers);

router.post(createUser, UserController.createUser);

router.put(updateUser, UserController.updateUser);

router.delete(deleteUser, UserController.deleteUser);

router.get(getTeam, teamController.getTeam);

router.get(getTeams, teamController.getTeams);

router.post(findTeamWithTeamName, teamController.findTeamWithTeamName);

router.post(createTeam, teamController.createTeam);

router.delete(
	deleteTeam,
	teamController.deleteTeam
);

router.get(getProjects, projectController.getProjects);

router.get(getProject, projectController.getProject);

router.post(
	createProject,
	projectController.createProject
);

router.put(
	updateProject,
	projectController.updateProject
);

router.delete(
	deleteProject,
	projectController.deleteProject
);

router.get(getComments, commentController.getComments);

router.post(
	createComment,
	commentController.createComment
);

router.put(updateComment, commentController.updateComment);

router.delete(
	deleteComment,
	commentController.deleteComment
);


module.exports = router;
