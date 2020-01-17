import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUserId = createSelector([ selectUser ], (user) => user.userId);
export const selectUsername = createSelector([ selectUser ], (user) => user.username);
export const selectIsAdmin = createSelector([ selectUser ], (user) => user.isAdmin);
export const selectIsUserSignedIn = createSelector([ selectUser ], (user) => user.isSignedIn);
