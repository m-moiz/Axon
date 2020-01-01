import { IssueActionTypes } from './issue.types';

const INITIAL_STATE = {
	isCreateIssueModalOpen: false,
	isDeleteIssueModalOpen: false,
	isEditIssueModalOpen: false,
	issues: []
};

export const issueReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case IssueActionTypes.TOGGLE_CREATE_ISSUE_MODAL:
			return Object.assign({}, state, { isCreateIssueModalOpen: !state.isCreateIssueModalOpen });
		case IssueActionTypes.SET_ISSUES_ARRAY:
			return Object.assign({}, state, { issues: action.payload });
		case IssueActionTypes.TOGGLE_DELETE_ISSUE_MODAL:
			return Object.assign({}, state, { isDeleteIssueModalOpen: !state.isDeleteIssueModalOpen });
		case IssueActionTypes.TOGGLE_EDIT_ISSUE_MODAL:
			return Object.assign({}, state, { isEditIssueModalOpen: !state.isEditIssueModalOpen });
		case IssueActionTypes.EMPTY_ISSUES_ARRAY:
			return Object.assign({}, state, { issues: [] });
		default:
			return state;
	}
};
