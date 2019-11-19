import { userActionTypes } from './user.types';

const INITIAL_STATE = {
	userId: '',
	projectId: ''
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case userActionTypes.SET_USER_ID:
			return Object.assign({}, state, { userId: action.payload });
		case userActionTypes.SET_PROJECT_ID:
			return Object.assign({}, state, { projectId: action.payload });
		default:
			return state;
	}
};
