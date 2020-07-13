const RoleCreator = require('./RoleCreator');
const User = require('../models/user.model').User;
const Team = require('../models/team.model').Team;

const RoleAssigner = {
	async assignTeamManagerRole(userId, resourceId) {
		const teamManager = await RoleCreator.createTeamManager(resourceId);
		const teamMember = await RoleCreator.createTeamMember(resourceId);

		await User.updateOne(
			{ _id: userId },
			{
				$push: { roles: { $each: [ teamManager, teamMember ] } }
			}
		);

		return [ teamManager, teamMember ];
	},

	async assignProjectManagerRole(userId, ids) {
		const projectManager = await RoleCreator.createProjectManager(ids);
		const projectMember = await RoleCreator.createProjectMember(ids);
		await User.updateOne(
			{ _id: userId },
			{
				$push: { roles: { $each: [ projectManager, projectMember ] } }
			}
		);
		return [ projectManager, projectMember ];
	},

	async assignCommentCreatorRole(userId, ids) {
		const commentCreator = await RoleCreator.createCommentCreator(ids);
		await User.updateOne(
			{ _id: userId },
			{
				$push: { roles: commentCreator }
			}
		);
		return commentCreator;
	},

	async assignIssueCreatorRole(userId, ids) {
		const issueCreator = await RoleCreator.createIssueCreator(ids);
		await User.updateOne(
			{ _id: userId },
			{
				$push: { roles: issueCreator }
			}
		);
		return issueCreator;
	}
};

module.exports = RoleAssigner;
