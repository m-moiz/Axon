import { teamActionTypes } from './team.types';

const INITIAL_STATE = {
	teamId: '',
	allTeamsOfUser: ''
};

export const teamReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case teamActionTypes.SET_TEAM_ID:
			return { ...state, teamId: action.payload };
		case teamActionTypes.SET_TEAMS_ARRAY:
			return { ...state, allTeamsOfUser: action.payload };
		default:
			return state;
	}
};
