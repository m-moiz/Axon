import { IssueActionTypes } from './issue.types';
import { batch } from 'react-redux';

export const setIssueId = (id) => ({
	type: IssueActionTypes.SET_ISSUE_ID,
	payload: id
});

export const toggleDeleteIssues = () => ({
	type: IssueActionTypes.TOGGLE_DELETE_ISSUES
});

export const toggleEditIssues = () => ({
	type: IssueActionTypes.TOGGLE_EDIT_ISSUES
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

export const closeLabelOptionBox = () => ({
	type: IssueActionTypes.CLOSE_LABEL_OPTIONS_BOX
});

export const closeSortOptionBox = () => ({
	type: IssueActionTypes.ClOSE_SORT_OPTIONS_BOX
});

export const closeStatusOptionBox = () => ({
	type: IssueActionTypes.CLOSE_STATUS_OPTIONS_BOX
});

export const toggleSortOptionsBox = () => {
	return (dispatch) => {
		batch(() => {
			dispatch(closeLabelOptionBox());
			dispatch(closeStatusOptionBox());
		});

		return dispatch({
			type: IssueActionTypes.TOGGLE_SORT_OPTIONS_BOX
		});
	};
};

export const toggleLabelOptionsBox = () => {
	return (dispatch) => {
		batch(() => {
			dispatch(closeSortOptionBox());
			dispatch(closeStatusOptionBox());
		});

		return dispatch({
			type: IssueActionTypes.TOGGLE_LABEL_OPTIONS_BOX
		});
	};
};

export const toggleStatusOptionsBox = () => {
	return (dispatch) => {
		batch(() => {
			dispatch(closeSortOptionBox());
			dispatch(closeLabelOptionBox());
		});

		return dispatch({
			type: IssueActionTypes.TOGGLE_STATUS_OPTIONS_BOX
		});
	};
};
