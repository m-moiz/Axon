import { IssueActionTypes } from './issue.types';

export const setIssueId = (id) => ({
	type: IssueActionTypes.SET_ISSUE_ID,
	payload: id
});

export const toggleCreateIssueModal = () => ({
	type: IssueActionTypes.TOGGLE_CREATE_ISSUE_MODAL
});

export const toggleDeleteIssueModal = () => ({
	type: IssueActionTypes.TOGGLE_DELETE_ISSUE_MODAL
});

export const toggleEditIssueModal = () => ({
	type: IssueActionTypes.TOGGLE_EDIT_ISSUE_MODAL
});

export const setIssuesArray = (issues) => ({
	type: IssueActionTypes.SET_ISSUES_ARRAY,
	payload: issues
});

export const emptyIssuesArray = () => ({
	type: IssueActionTypes.EMPTY_ISSUES_ARRAY
});

export const setSearchText = (inputText) => ({
	type: IssueActionTypes.SET_SEARCH_TEXT,
	payload: inputText
});

export const toggleSortOptionsBox = () => ({
	type: IssueActionTypes.TOGGLE_SORT_OPTIONS_BOX
});

export const toggleLabelOptionsBox = () => ({
	type: IssueActionTypes.TOGGLE_LABEL_OPTIONS_BOX
});

export const toggleStatusOptionsBox = () => ({
	type: IssueActionTypes.TOGGLE_STATUS_OPTIONS_BOX
});
