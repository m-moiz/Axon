const User = require('../models/user.model').User;
const Project = require('../models/project.model').Project;

exports.createProject = async (req, res) => {
	let project = new Project();
	const { userId } = req.params;
	const { projectName, projectDesc } = req.body;
	User.findOne({ _id: userId, 'projects.name': projectName }, async (err, user) => {
		console.log(user);
		if (user === null) {
			project.name = projectName;
			project.description = projectDesc;
			try {
				let user = await User.findOneAndUpdate({ _id: userId }, { $push: { projects: project } });
				return res.status(200).json({ message: 'Successfully create project in db' });
			} catch (ex) {
				console.log(ex);
				return res.status(404).json({ message: "Couldn't create project" });
			}
		}
	});
};

exports.getProjects = async (req, res) => {
	const { userId } = req.params;
	let project = await User.find(
		{ _id: userId },
		{ 'projects._id': 1, 'projects.name': 1, 'projects.description': 1 }
	);
	return res.status(200).json({ result: project });
};

exports.getProject = (req, res) => {
	const { userId } = req.params;
	const { projectName } = req.body;

	User.findOne({ _id: userId, 'projects.name': projectName }, (err, user) => {
		if (err) return res.status(404).json({ message: err });
		if (user) return res.status(200).json({ message: 'Project already exists' });
	});
};

exports.updateProject = (req, res) => {
	const { userId, projectId } = req.params;
	const { name, description } = req.body;
	User.updateOne(
		{ _id: userId, 'projects._id': projectId },
		{ $set: { 'projects.$.name': name, 'projects.$.description': description } },
		(err, doc) => {
			if (err) return res.status(404).json({ message: err });
			return res.status(200).json({ message: 'Project updated successfully' });
		}
	);
};

exports.deleteProject = (req, res) => {
	const { userId, projectId } = req.params;

	User.findByIdAndUpdate({ _id: userId }, { $pull: { projects: { _id: projectId } } }, (err, user) => {
		if (err) return res.status(404).json({ message: "Couldn't delete project" });

		return res.status(200).json({ message: 'Successfully deleted project' });
	});
};
