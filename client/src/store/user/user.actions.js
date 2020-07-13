import axios from 'axios';
import { userActionTypes } from './user.types';

export const setUserId = (userId) => ({
	type: userActionTypes.SET_USER_ID,
	payload: userId
});

export const setRoles = (roles) => ({
	type: userActionTypes.SET_ROLES,
	payload: roles
});

export const addRoles = (roles) => ({
	type: userActionTypes.ADD_ROLES,
	payload: roles
});

export const setTeamManager = (teamManager) => ({
	type: userActionTypes.SET_TEAM_MANAGER,
	payload: teamManager
});

export const setProjectManager = (projectManager) => ({
	type: userActionTypes.SET_PROJECT_MANAGER,
	payload: projectManager
});

export const setIssueCreator = (issueCreator) => ({
	type: userActionTypes.SET_ISSUE_CREATOR,
	payload: issueCreator
});

export const setCommentCreator = (commentCreator) => ({
	type: userActionTypes.SET_COMMENT_CREATOR,
	payload: commentCreator
});

export const setUsername = (username) => ({
	type: userActionTypes.SET_USER_NAME,
	payload: username
});

export const toggleAppTheme = () => ({
	type: userActionTypes.TOGGLE_APP_THEME
});

export const signIn = () => ({
	type: userActionTypes.SIGN_IN
});

export const signOut = (token) => {
	return (dispatch) => {
		axios({
			method: 'post',
			url: '/api/user/signout',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				token: token
			}
		})
			.then(() => {
				dispatch({
					type: userActionTypes.SIGN_OUT
				});
			})
			.catch((err) => console.log(err));
	};
};
