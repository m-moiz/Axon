import { createSelector } from 'reselect';

const selectIssue = (state) => state.issue;

export const selectIssueId = createSelector([ selectIssue ], (issue) => issue.issueId);
export const selectIssues = createSelector([ selectIssue ], (issue) => issue.issues);
export const selectSearchText = createSelector([ selectIssue ], (issue) => issue.searchText);
export const selectIsShowingDeleteButton = createSelector([ selectIssue ], (issue) => issue.isShowingDeleteButton);
export const selectIsShowingEditButton = createSelector([ selectIssue ], (issue) => issue.isShowingEditButton);
export const selectIsCreateIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isCreateIssueModalOpen);
export const selectIsDeleteIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isDeleteIssueModalOpen);
export const selectIsEditIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isEditIssueModalOpen);
export const selectIsSortOptionsBoxOpen = createSelector([ selectIssue ], (issue) => issue.isSortOptionsBoxOpen);
export const selectIsLabelOptionsBoxOpen = createSelector([ selectIssue ], (issue) => issue.isLabelOptionsBoxOpen);
export const selectIsStatusOptionsBoxOpen = createSelector([ selectIssue ], (issue) => issue.isStatusOptionsBoxOpen);
export const selectFilteredIssues = createSelector(
	[ selectIssues, selectSearchText ],
	(issues, searchText) =>
		Array.isArray(issues) && issues.length > 0
			? issues.filter((issue) => issue.summary.toLowerCase().match(searchText.toLowerCase()))
			: []
);
