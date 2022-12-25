import { teamActionTypes } from './team.types';

const INITIAL_STATE = {
	teamId: '',
	allTeamsOfUser: '',
	shouldDeleteTeams: false,
	shouldEditTeams: false,
	isDeleteTeamModalOpen: false,
	isCreateTeamModalOpen: false,
	isEditTeamModalOpen: false,
	allUsersInTeam: ''
};

export const teamReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case teamActionTypes.SET_TEAM_ID:
			return { ...state, teamId: action.payload };
		case teamActionTypes.SET_TEAMS_ARRAY:
			return { ...state, allTeamsOfUser: action.payload };
		case teamActionTypes.SET_TEAM_USERS:
			return { ...state, allUsersInTeam: action.payload };
		case teamActionTypes.TOGGLE_CREATE_TEAM_MODAL:
			return { ...state, isCreateTeamModalOpen: !state.isCreateTeamModalOpen };
		case teamActionTypes.TOGGLE_DELETE_TEAM_MODAL:
			return { ...state, isDeleteTeamModalOpen: !state.isDeleteTeamModalOpen };
		case teamActionTypes.TOGGLE_EDIT_TEAM_MODAL:
			return { ...state, isEditTeamModalOpen: !state.isEditTeamModalOpen };
		case teamActionTypes.TOGGLE_EDIT_TEAMS:
			return { ...state, shouldEditTeams: !state.shouldEditTeams };
		case teamActionTypes.TOGGLE_DELETE_TEAMS:
			return { ...state, shouldDeleteTeams: !state.shouldDeleteTeams };
		default:
			return state;
	}
};
