import { IssueActionTypes } from './issue.types';

const INITIAL_STATE = {
	toggleCreateIssue: false,
	issues: []
};

export const issueReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case IssueActionTypes.TOGGLE_CREATE_ISSUE:
			return Object.assign({}, state, { toggleCreateIssue: !state.toggleCreateIssue });
		case IssueActionTypes.SET_ISSUES_ARRAY:
			return Object.assign({}, state, { issues: action.payload });
		default:
			return state;
	}
};
