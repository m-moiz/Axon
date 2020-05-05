import axios from 'axios';
import { Dispatch } from 'redux';
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

export const toggleAppTheme = () => ({
	type: userActionTypes.TOGGLE_APP_THEME
});

export const signIn = () => ({
	type: userActionTypes.SIGN_IN
});

export const signOut = (token) => {
	return (dispatch: Dispatch) => {
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
