const User = require('../models/user.model').User;
const Project = require('../models/project.model').Project;

exports.createProject = async (req, res) => {
	let project = new Project();
	const { userId } = req.params;
	const { projectName, projectDesc } = req.body;
	project.name = projectName;
	project.description = projectDesc;
	try {
		let user = await User.findOneAndUpdate({ _id: userId }, { $push: { projects: project } });
		return res.status(200).json({ message: 'Successfully create project in db' });
	} catch (ex) {
		console.log(ex);
		return res.status(404).json({ message: "Couldn't create project" });
	}
};

exports.getProjects = async (req, res) => {
	const { userId } = req.params;
	let project = await User.find({ _id: userId }).select('projects');
	return res.status(200).json({ result: project });
};

exports.updateProject = (req, res) => {};

exports.deleteProject = (req, res) => {
	const { userId, projectId } = req.params;

	User.findByIdAndUpdate({ _id: userId }, { $pull: { projects: { _id: projectId } } }, (err, user) => {
		if (err) return res.status(404).json({ message: "Couldn't delete project" });

		return res.status(200).json({ message: 'Successfully deleted project' });
	});
};
