import { createSelector } from 'reselect';

const selectIssue = (state) => state.issue;

export const selectIssues = createSelector([ selectIssue ], (issue) => issue.issues);
export const selectSearchText = createSelector([ selectIssue ], (issue) => issue.searchText);
export const selectIsCreateIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isCreateIssueModalOpen);
export const selectIsDeleteIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isDeleteIssueModalOpen);
export const selectIsEditIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isEditIssueModalOpen);

export const selectFilteredIssues = createSelector(
	[ selectIssues, selectSearchText ],
	(issues, searchText) =>
		Array.isArray(issues) && issues.length > 0
			? issues.filter((issue) => issue.summary.toLowerCase().startsWith(searchText.toLowerCase()))
			: []
);
