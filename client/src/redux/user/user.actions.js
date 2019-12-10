import { userActionTypes } from './user.types';

export const setUserId = (userId) => ({
	type: userActionTypes.SET_USER_ID,
	payload: userId
});

export const signIn = () => ({
	type: userActionTypes.SIGN_IN
});

export const signOut = () => ({
	type: userActionTypes.SIGN_OUT
});
