import { teamActionTypes } from './team.types';

export const setTeamId = (id) => ({
	type: teamActionTypes.SET_TEAM_ID,
	payload: id
});

export const setTeamArray = (array) => ({
	type: teamActionTypes.SET_TEAMS_ARRAY,
	payload: array
});
