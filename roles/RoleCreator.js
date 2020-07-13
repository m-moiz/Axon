const roleTypes = require('../types/types').roleTypes;
const permissionTypes = require('../types/types').permissionTypes;
const Role = require('../models/role.model').Role;

const createRole = async (roleParams) => {
	const _role = new Role();

	const { role, permissions, resourceId } = roleParams;
	_role.role = role;
	_role.permissions.push(...permissions);
	_role.resourceId = resourceId;

	return _role;
};

const RoleCreator = {
	async createTeamManager(teamId) {
		const roleParams = {
			role: roleTypes.TEAM_MANAGER,
			permissions: [
				permissionTypes.CAN_ASSIGN_TEAM_MEMBERS,
				permissionTypes.CAN_EDIT_TEAM,
				permissionTypes.CAN_REMOVE_TEAM_MEMBERS
			],
			resourceId: teamId
		};
		const teamManagerRole = await createRole(roleParams);
		teamManagerRole.teamId = teamId;
		return teamManagerRole;
	},

	async createTeamMember(teamId) {
		const roleParams = {
			role: roleTypes.TEAM_MEMBER,
			permissions: [ permissionTypes.CAN_CREATE_PROJECTS ],
			resourceId: teamId
		};
		const teamMemberRole = await createRole(roleParams);
		teamMemberRole.teamId = teamId;
		return teamMemberRole;
	},

	async createProjectManager(ids) {
		const { teamId, id } = ids;
		console.log(id);
		const roleParams = {
			role: roleTypes.PROJECT_MANAGER,
			permissions: [
				permissionTypes.CAN_ASSIGN_PROJECT_MEMBERS,
				permissionTypes.CAN_EDIT_PROJECT,
				permissionTypes.CAN_DELETE_PROJECT
			],
			resourceId: id
		};
		const projectManagerRole = await createRole(roleParams);
		projectManagerRole.teamId = teamId;
		projectManagerRole.projectId = id;
		return projectManagerRole;
	},

	async createProjectMember(ids) {
		const { teamId, id } = ids;
		const roleParams = {
			role: roleTypes.PROJECT_MEMBER,
			permissions: [
				permissionTypes.CAN_CREATE_ISSUES,
				permissionTypes.CAN_CREATE_COMMENTS,
				permissionTypes.CAN_VIEW_BOARD
			],
			resourceId: id
		};
		const projectMemberRole = await createRole(roleParams);
		projectMemberRole.teamId = teamId;
		projectMemberRole.projectId = id;
		return projectMemberRole;
	},

	async createIssueCreator(ids) {
		const { teamId, projectId, issueId } = ids;
		const roleParams = {
			role: roleTypes.ISSUE_CREATOR,
			permissions: [
				permissionTypes.CAN_EDIT_ISSUE,
				permissionTypes.CAN_DELETE_ISSUE,
				permissionTypes.CAN_MOVE_ISSUE_IN_BOARD,
				permissionTypes.CAN_ADD_ISSUE_TO_BOARD
			],
			resourceId: issueId
		};
		const issueCreatorRole = await createRole(roleParams);
		issueCreatorRole.teamId = teamId;
		issueCreatorRole.projectId = projectId;
		issueCreatorRole.issueId = issueId;

		return issueCreatorRole;
	},

	async createCommentCreator(ids) {
		const { teamId, projectId, issueId, commentId } = ids;
		const roleParams = {
			role: roleTypes.COMMENT_CREATOR,
			permissions: [ permissionTypes.CAN_DELETE_COMMENT, permissionTypes.CAN_EDIT_COMMENT ],
			resourceId: commentId
		};
		const commentCreatorRole = await createRole(roleParams);
		commentCreatorRole.teamId = teamId;
		commentCreatorRole.projectId = projectId;
		commentCreatorRole.issueId = issueId;
		commentCreatorRole.commentId = commentId;
		return commentCreatorRole;
	}
};

module.exports = RoleCreator;
