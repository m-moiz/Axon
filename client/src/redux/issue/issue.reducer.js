import { IssueActionTypes } from './issues.types';

const INITIAL_STATE = {
	toggleCreateIssue: false
};

export const issueReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case IssueActionTypes.TOGGLE_CREATE_ISSUE:
			return Object.assign({}, state, { toggleCreateIssue: !state.toggleCreateIssue });
		default:
			return state;
	}
};
