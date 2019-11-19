import { userActionTypes } from './user.types';

export const setUserId = (userId) => ({
	type: userActionTypes.SET_USER_ID,
	payload: userId
});

export const setProjectId = (projectId) => ({
	type: userActionTypes.SET_PROJECT_ID,
	payload: projectId
});
