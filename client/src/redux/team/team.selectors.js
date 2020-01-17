import { createSelector } from 'reselect';

const selectTeam = (state) => state.team;
export const selectTeamArray = createSelector([ selectTeam ], (team) => team.allTeamsOfUser);
export const selectTeamId = createSelector([ selectTeam ], (team) => team.teamId);
