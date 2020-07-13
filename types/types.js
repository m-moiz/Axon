exports.issueTypes = { Bug: 'Bug', Improvement: 'Improvement', Task: 'Task', Feature: 'Feature', Epic: 'Epic' };
exports.priorityTypes = { High: 'Hign', Medium: 'Medium', Low: 'Low', Lowest: 'Lowest' };
exports.statusTypes = { Open: 'Open', Closed: 'Closed' };
exports.roleTypes = {
	TEAM_MANAGER: 'TEAM_MANAGER',
	PROJECT_MANAGER: 'PROJECT_MANAGER',
	TEAM_MEMBER: 'TEAM_MEMBER',
	PROJECT_MEMBER: 'PROJECT_MEMBER',
	ISSUE_CREATOR: 'ISSUE_CREATOR',
	COMMENT_CREATOR: 'COMMENT_CREATOR'
};
exports.permissionTypes = {
	CAN_CREATE_TEAM: 'CAN_CREATE_TEAM',
	CAN_JOIN_TEAMS: 'CAN_JOIN_TEAMS',
	CAN_ASSIGN_TEAM_MEMBERS: 'CAN_ASSIGN_TEAM_MEMBERS',
	CAN_REMOVE_TEAM_MEMBERS: 'CAN_REMOVE_TEAM_MEMBERS',
	CAN_CREATE_PROJECTS: 'CAN_CREATE_PROJECTS',
	CAN_DELETE_PROJECT: 'CAN_DELETE_PROJECT',
	CAN_EDIT_PROJECT: 'CAN_EDIT_PROJECT',
	CAN_ASSIGN_PROJECT_MEMBERS: 'CAN_ASSIGN_PROJECT_MEMBERS',
	CAN_REMOVE_PROJECT_MEMBERS: 'CAN_REMOVE_PROJECT_MEMBERS',
	CAN_CREATE_ISSUES: 'CAN_CREATE_ISSUES',
	CAN_CREATE_COMMENTS: 'CAN_CREATE_COMMENTS',
	CAN_VIEW_BOARD: 'CAN_VIEW_BOARD',
	CAN_VIEW_ISSUES: 'CAN_VIEW_ISSUES',
	CAN_VIEW_COMMENTS: 'CAN_VIEW_COMMENTS',
	CAN_VIEW_PROJECTS: 'CAN_VIEW_PROJECTS',
	CAN_VIEW_TEAMS: 'CAN_VIEW_TEAMS',
	CAN_EDIT_COMMENT: 'CAN_EDIT_COMMENT',
	CAN_DELETE_COMMENT: 'CAN_DELETE_COMMENT',
	CAN_DELETE_ISSUE: 'CAN_DELETE_ISSUE',
	CAN_EDIT_ISSUE: 'CAN_EDIT_ISSUE',
	CAN_ADD_ISSUE_TO_BOARD: 'CAN_ADD_ISSUE_TO_BOARD',
	CAN_MOVE_ISSUE_IN_BOARD: 'CAN_MOVE_ISSUE_IN_BOARD'
};
