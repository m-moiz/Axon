import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUserId = createSelector([ selectUser ], (user) => user.userId);
export const selectUsername = createSelector([ selectUser ], (user) => user.username);
export const selectIsUserSignedIn = createSelector([ selectUser ], (user) => user.isSignedIn);
