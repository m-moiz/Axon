import { teamActionTypes } from './team.types';

export const setTeamId = (id) => ({
	type: teamActionTypes.SET_TEAM_ID,
	payload: id
});

export const setTeamArray = (array) => ({
	type: teamActionTypes.SET_TEAMS_ARRAY,
	payload: array
});

export const toggleDeleteTeams = () => ({
	type: teamActionTypes.TOGGLE_DELETE_TEAMS
});

export const toggleEditTeams = () => ({
	type: teamActionTypes.TOGGLE_EDIT_TEAMS
});

export const toggleDeleteTeamModal = () => ({
	type: teamActionTypes.TOGGLE_DELETE_TEAM_MODAL
});

export const toggleCreateTeamModal = () => ({
	type: teamActionTypes.TOGGLE_CREATE_TEAM_MODAL
});

export const toggleEditTeamModal = () => ({
	type: teamActionTypes.TOGGLE_EDIT_TEAM_MODAL
});
