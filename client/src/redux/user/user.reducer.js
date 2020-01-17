import { userActionTypes } from './user.types';

const INITIAL_STATE = {
	userId: '',
	username: '',
	isAdmin: '',
	isSignedIn: false
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case userActionTypes.SET_USER_ID:
			return Object.assign({}, state, { userId: action.payload });
		case userActionTypes.SIGN_IN:
			return Object.assign({}, state, { isSignedIn: true });
		case userActionTypes.SIGN_OUT:
			return Object.assign({}, state, { isSignedIn: false });
		case userActionTypes.SET_USER_NAME:
			return Object.assign({}, state, { username: action.payload });
		case userActionTypes.SET_IS_ADMIN:
			return Object.assign({}, state, { isAdmin: action.payload });
		default:
			return state;
	}
};
