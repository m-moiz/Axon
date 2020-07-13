const User = require('../models/user.model').User;

const RoleRemover = {
	async removeTeamManagerRole(teamId) {
		await User.updateMany({ 'roles.teamId': teamId }, { $unset: { 'roles.teamId': teamId } });
	},

	async removeProjectManagerRole(projectId) {
		await User.updateMany({ 'roles.projectId': projectId }, { $unset: { 'roles.projectId': projectId } });
	},

	async removeCommentCreatorRole(userId, commentId) {
		await User.update({ _id: userId }, { $pull: { 'roles.commentId': commentId } });
	},

	async removeIssueCreatorRole(issueId) {
		await User.updateMany({}, { $pull: { 'roles.issueId': issueId } });
	}
};

module.exports = RoleRemover;
