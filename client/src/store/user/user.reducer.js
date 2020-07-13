import { userActionTypes } from './user.types';

const INITIAL_STATE = {
	userId: '',
	commentCreator: '',
	issueCreator: '',
	teamManager: '',
	projectManager: '',
	username: '',
	isSignedIn: false,
	isDarkTheme: true,
	roles: []
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case userActionTypes.SET_USER_ID:
			return Object.assign({}, state, { userId: action.payload });
		case userActionTypes.SET_TEAM_MANAGER:
			return Object.assign({}, state, { teamManager: action.payload });
		case userActionTypes.SET_PROJECT_MANAGER:
			return Object.assign({}, state, { projectManager: action.payload });
		case userActionTypes.SET_ISSUE_CREATOR:
			return Object.assign({}, state, { issueCreator: action.payload });
		case userActionTypes.SET_COMMENT_CREATOR:
			return Object.assign({}, state, { commentCreator: action.payload });
		case userActionTypes.SIGN_IN:
			return Object.assign({}, state, { isSignedIn: true });
		case userActionTypes.SIGN_OUT:
			return Object.assign({}, state, { isSignedIn: false });
		case userActionTypes.SET_USER_NAME:
			return Object.assign({}, state, { username: action.payload });
		case userActionTypes.TOGGLE_APP_THEME:
			return Object.assign({}, state, { isDarkTheme: !state.isDarkTheme });
		case userActionTypes.SET_ROLES:
			return Object.assign({}, state, { roles: action.payload });
		case userActionTypes.ADD_ROLES:
			return Object.assign({}, state, { roles: [ ...state.roles, action.payload ] });
		default:
			return state;
	}
};
