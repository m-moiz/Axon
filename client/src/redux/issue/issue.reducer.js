import { IssueActionTypes } from './issue.types';

const INITIAL_STATE = {
	toggleCreateIssue: false,
	toggleDeleteIssueModal: false,
	toggleEditIssueModal: false,
	issues: []
};

export const issueReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case IssueActionTypes.TOGGLE_CREATE_ISSUE:
			return Object.assign({}, state, { toggleCreateIssue: !state.toggleCreateIssue });
		case IssueActionTypes.SET_ISSUES_ARRAY:
			return Object.assign({}, state, { issues: action.payload });
		case IssueActionTypes.TOGGLE_DELETE_ISSUE_MODAL:
			return Object.assign({}, state, { toggleDeleteIssueModal: !state.toggleDeleteIssueModal });
		case IssueActionTypes.TOGGLE_EDIT_ISSUE_MODAL:
			return Object.assign({}, state, { toggleEditIssueModal: !state.toggleEditIssueModal });
		case IssueActionTypes.EMPTY_ISSUES_ARRAY:
			return Object.assign({}, state, { issues: [] });
		default:
			return state;
	}
};
