const roles = {
	role: 'Default',
	permission: [ 'CAN_JOIN_TEAMS' ],
	role: 'Team Creator',
	permissions: [ 'CAN_ASSIGN_TEAM_MEMBERS', 'CAN_REMOVE_TEAM_MEMBERS' ],
	role: 'Team Member',
	permissions: [ 'CAN_CREATE_PROJECTS' ],
	role: 'Project Manager',
	permissions: [ 'CAN_ASSIGN_PROJECT_MEMBERS', 'CAN_REMOVE_PROJECT_MEMBERS' ],
	role: 'Project Member',
	permissions: [ 'CAN_CREATE_ISSUES', 'CAN_CREATE_COMMENTS', 'CAN_VIEW_BOARD' ],
	role: 'Comment Creator',
	permissions: [ 'CAN_EDIT_COMMENT', 'CAN_DELETE_COMMENT' ],
	role: 'Issue Creator',
	permissions: [ 'CAN_DELETE_ISSUE', 'CAN_EDIT_ISSUE', 'CAN_ADD_ISSUE_TO_BOARD', 'CAN_MOVE_ISSUE_IN_BOARD' ]
};
