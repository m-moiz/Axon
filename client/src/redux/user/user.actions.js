import { userActionTypes } from './user.types';

export const setUserId = (userId) => ({
	type: userActionTypes.SET_USER_ID,
	payload: userId
});

export const setIsAdmin = (isAdmin) => ({
	type: userActionTypes.SET_IS_ADMIN,
	payload: isAdmin
});

export const setUsername = (username) => ({
	type: userActionTypes.SET_USER_NAME,
	payload: username
});

export const signIn = () => ({
	type: userActionTypes.SIGN_IN
});

export const signOut = () => ({
	type: userActionTypes.SIGN_OUT
});
