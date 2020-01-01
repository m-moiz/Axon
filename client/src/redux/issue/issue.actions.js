import { IssueActionTypes } from './issue.types';

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
