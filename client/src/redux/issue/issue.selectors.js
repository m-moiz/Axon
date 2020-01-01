import { createSelector } from 'reselect';

const selectIssue = (state) => state.issue;

export const selectIssues = createSelector([ selectIssue ], (issue) => issue.issues);
export const selectIsCreateIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isCreateIssueModalOpen);
export const selectIsDeleteIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isDeleteIssueModalOpen);
export const selectIsEditIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isEditIssueModalOpen);
