import { IssueActionTypes } from './issue.types';

export const toggleCreateIssue = () => ({
	type: IssueActionTypes.TOGGLE_CREATE_ISSUE
});

export const setIssuesArray = (issues) => ({
	type: IssueActionTypes.SET_ISSUES_ARRAY,
	payload: issues
});
