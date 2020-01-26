import { createSelector } from 'reselect';

const selectTeam = (state) => state.team;
export const selectTeamArray = createSelector([ selectTeam ], (team) => team.allTeamsOfUser);
export const selectTeamId = createSelector([ selectTeam ], (team) => team.teamId);
export const selectShouldDeleteTeams = createSelector([ selectTeam ], (team) => team.shouldDeleteTeams);
export const selectShouldEditTeams = createSelector([ selectTeam ], (team) => team.shouldEditTeams);

export const selectIsDeleteTeamModalOpen = createSelector([ selectTeam ], (team) => team.isDeleteTeamModalOpen);

export const selectIsCreateTeamModalOpen = createSelector([ selectTeam ], (team) => team.isCreateTeamModalOpen);

export const selectIsEditTeamModalOpen = createSelector([ selectTeam ], (team) => team.isEditTeamModalOpen);
