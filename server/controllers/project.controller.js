const User = require('../models/user.model').User;
const Project = require('../models/project.model').Project;

exports.createProject = async (req, res) => {
	let project = new Project();
	const { username, projectName } = req.body;
	project.name = projectName;
	try {
		let user = await User.findOneAndUpdate(username, { $push: { projects: project } });
		return res.status(200).json({ message: 'Successfully create project in db' });
	} catch (ex) {
		console.log(ex);
		return res.status(404).json({ message: "Couldn't create project" });
	}
};

exports.getProject = async (req, res) => {
	const { username, projectName } = req.body;
	let project = await User.find({ username: username }).select('projects').where('name').equals(projectName);
	return res.status(200).json({ result: project });
};

exports.updateProject = (req, res) => {};

exports.deleteProject = (req, res) => {};
