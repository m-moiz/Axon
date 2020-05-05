const Team = require('../models/team.model').Team;
const Project = require('../models/project.model').Project;

exports.createProject = async (req: Request, res: Response) => {
	let project = new Project();
	const { teamId } = req.params;
	const { projectName, projectDesc } = req.body;

	Team.findOne({ _id: teamId, 'projects.name': projectName }, async (result) => {
		if (result === null) {
			project.name = projectName;
			project.description = projectDesc;

			try {
				let result = await Team.findOneAndUpdate({ _id: teamId }, { $push: { projects: project } });
				return res.status(200).json({ message: 'Successfully created project' });
			} catch (ex) {
				console.log(ex);
				return res.status(404).json({ message: "Couldn't create project" });
			}
		}
	});
};

exports.getProjects = async (req: Request, res: Response) => {
	const { teamId } = req.params;

	let projects = await Team.find(
		{ _id: teamId },
		{ 'projects._id': 1, 'projects.name': 1, 'projects.description': 1 }
	);

	return res.status(200).json({ result: projects });
};

exports.getProject = (req: Request, res: Response) => {
	const { teamId } = req.params;
	const { projectName } = req.body;

	Team.findOne({ _id: teamId, 'projects.name': projectName }, (err, team) => {
		if (err) return res.status(200).json({ message: 'Project not found' });
		if (team) return res.status(200).json({ message: 'Project already exists' });
	});
};

exports.updateProject = (req: Request, res: Response) => {
	const { teamId, projectId } = req.params;
	const { name, description } = req.body;
	Team.updateOne(
		{ _id: teamId, 'projects._id': projectId },
		{ $set: { 'projects.$.name': name, 'projects.$.description': description } },
		(err) => {
			if (err) return res.status(500).json({ message: err });
			return res.status(200).json({ message: 'Project updated successfully' });
		}
	);
};

exports.deleteProject = (req: Request, res: Response) => {
	const { teamId, projectId } = req.params;

	Team.findByIdAndUpdate({ _id: teamId }, { $pull: { projects: { _id: projectId } } }, (err) => {
		if (err) return res.status(404).json({ message: "Couldn't delete project" });

		return res.status(200).json({ message: 'Successfully deleted project' });
	});
};
