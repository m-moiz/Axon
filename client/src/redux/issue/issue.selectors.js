import { createSelector } from 'reselect';
import { sortByKey } from '../../utils/sort';

const selectIssue = (state) => state.issue;

export const selectIssueId = createSelector([ selectIssue ], (issue) => issue.issueId);
export const selectIssues = createSelector([ selectIssue ], (issue) => issue.issues);
export const selectSearchText = createSelector([ selectIssue ], (issue) => issue.searchText);
export const selectStatusFilter = createSelector([ selectIssue ], (issue) => issue.statusFilter);
export const selectLabelFilter = createSelector([ selectIssue ], (issue) => issue.labelFilter);
export const selectSortType = createSelector([ selectIssue ], (issue) => issue.sortType);
export const selectIsShowingDeleteButton = createSelector([ selectIssue ], (issue) => issue.isShowingDeleteButton);
export const selectIsShowingEditButton = createSelector([ selectIssue ], (issue) => issue.isShowingEditButton);
export const selectIsCreateIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isCreateIssueModalOpen);
export const selectIsDeleteIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isDeleteIssueModalOpen);
export const selectIsEditIssueModalOpen = createSelector([ selectIssue ], (issue) => issue.isEditIssueModalOpen);
export const selectIsSortOptionsBoxOpen = createSelector([ selectIssue ], (issue) => issue.isSortOptionsBoxOpen);
export const selectIsLabelOptionsBoxOpen = createSelector([ selectIssue ], (issue) => issue.isLabelOptionsBoxOpen);
export const selectIsStatusOptionsBoxOpen = createSelector([ selectIssue ], (issue) => issue.isStatusOptionsBoxOpen);
export const selectStatusFilteredIssues = createSelector(
	[ selectIssues, selectStatusFilter ],
	(issues, statusFilter) => {
		if (Array.isArray(issues) && issues.length > 0 && statusFilter) {
			return issues.filter((issue) => issue.status === statusFilter);
		} else if (Array.isArray(issues) && issues.length > 0 && !statusFilter) {
			return issues;
		} else {
			return [];
		}
	}
);

export const selectLabelFilteredIssues = createSelector([ selectIssues, selectLabelFilter ], (issues, labelFilter) => {
	if (Array.isArray(issues) && issues.length > 0 && labelFilter) {
		return issues.filter((issue) => issue.issueType === labelFilter);
	} else if (Array.isArray(issues) && issues.length > 0 && !labelFilter) {
		return issues;
	} else {
		return [];
	}
});

export const selectLabelAndStatusFilteredIssues = createSelector(
	[ selectIssues, selectLabelFilteredIssues, selectStatusFilteredIssues, selectLabelFilter, selectStatusFilter ],
	(issues, labelFilteredIssues, statusFilteredIssues, labelFilter, statusFilter) => {
		if (statusFilter && labelFilter && labelFilteredIssues.length > 0 && statusFilteredIssues.length > 0) {
			return statusFilteredIssues.filter((item) => item.issueType === labelFilter);
		} else if (!labelFilter && statusFilter && statusFilteredIssues.length > 0) {
			return statusFilteredIssues;
		} else if (!statusFilter && labelFilter && labelFilteredIssues.length > 0) {
			return labelFilteredIssues;
		} else if (!statusFilter && !labelFilter && Array.isArray(issues) && issues.length > 0) {
			return issues;
		} else {
			return [];
		}
	}
);

export const selectSearchFilteredIssues = createSelector(
	[ selectLabelAndStatusFilteredIssues, selectSearchText ],
	(labelAndStatusFilteredIssues, searchText) =>
		Array.isArray(labelAndStatusFilteredIssues) && labelAndStatusFilteredIssues.length > 0
			? labelAndStatusFilteredIssues.filter((issue) =>
					issue.summary.toLowerCase().match(searchText.toLowerCase())
				)
			: []
);

export const selectFilteredAndSortedIssues = createSelector(
	[ selectLabelAndStatusFilteredIssues, selectSortType ],
	(issues, sortType) => {
		if (Array.isArray(issues) && issues.length > 0 && sortType) {
			issues = sortByKey(issues, sortType);
			return issues;
		} else if (Array.isArray(issues) && issues.length > 0 && !sortType) {
			return issues;
		} else {
			return [];
		}
	}
);

export const selectIssueDescription = createSelector(
	[ selectIssues, selectIssueId ],
	(issues, issueId) =>
		Array.isArray(issues) && issues.length > 0 ? issues.find((issue) => issue._id === issueId).description : []
);

export const selectCurrentIssue = createSelector(
	[ selectIssues, selectIssueId ],
	(issues, issueId) =>
		Array.isArray(issues) && issues.length > 0 ? issues.filter((issue) => issue._id === issueId) : []
);
