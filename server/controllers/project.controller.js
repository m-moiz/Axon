const User = require('../models/user.model').User;
const Project = require('../models/project.model').Project;

exports.createProject = async (req, res) => {
	let project = new Project();
	const { username, projectName } = req.body;
	project.name = projectName;

	let user = await User.findOneAndUpdate({ username: username }, { projects: project });
};

exports.getProject = (req, res) => {};

exports.updateProject = (req, res) => {};

exports.deleteProject = (req, res) => {};
