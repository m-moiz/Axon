import { createSelector } from 'reselect';

const selectIssue = (state) => state.issue;

export const selectIssues = createSelector([ selectIssue ], (issue) => issue.issues);
export const selectToggleCreateIssue = createSelector([ selectIssue ], (issue) => issue.toggleCreateIssue);
