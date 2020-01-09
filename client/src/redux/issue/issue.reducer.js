import { IssueActionTypes } from './issue.types';

const INITIAL_STATE = {
	issueId: '',
	searchText: '',
	isCreateIssueModalOpen: false,
	isDeleteIssueModalOpen: false,
	isEditIssueModalOpen: false,
	isSortOptionsBoxOpen: false,
	isLabelOptionsBoxOpen: false,
	isStatusOptionsBoxOpen: false,
	isSortOptionBoxItemActive: false,
	isLabelOptionsBoxItemActive: false,
	isStatusOptionsBoxItemActive: false,
	isShowingDeleteButton: false,
	isShowingEditButton: false,
	statusFilter: '',
	labelFilter: '',
	isSorting: false,
	sortType: '',
	issues: []
};

export const issueReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case IssueActionTypes.SET_ISSUE_ID:
			return Object.assign({}, state, { issueId: action.payload });
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
		case IssueActionTypes.SET_SEARCH_TEXT:
			return { ...state, searchText: action.payload };
		case IssueActionTypes.TOGGLE_LABEL_OPTIONS_BOX:
			return { ...state, isLabelOptionsBoxOpen: !state.isLabelOptionsBoxOpen };
		case IssueActionTypes.TOGGLE_SORT_OPTIONS_BOX:
			return { ...state, isSortOptionsBoxOpen: !state.isSortOptionsBoxOpen };
		case IssueActionTypes.TOGGLE_STATUS_OPTIONS_BOX:
			return { ...state, isStatusOptionsBoxOpen: !state.isStatusOptionsBoxOpen };
		case IssueActionTypes.CLOSE_LABEL_OPTIONS_BOX:
			return { ...state, isLabelOptionsBoxOpen: false };
		case IssueActionTypes.CLOSE_STATUS_OPTIONS_BOX:
			return { ...state, isStatusOptionsBoxOpen: false };
		case IssueActionTypes.ClOSE_SORT_OPTIONS_BOX:
			return { ...state, isSortOptionsBoxOpen: false };
		case IssueActionTypes.TOGGLE_LABEL_OPTIONS_BOX_ITEM:
			return { ...state, isSortOptionBoxItemActive: !state.isSortOptionBoxItemActive };
		case IssueActionTypes.TOGGLE_STATUS_OPTIONS_BOX_ITEM:
			return { ...state, isStatusOptionsBoxItemActive: !state.isStatusOptionsBoxItemActive };
		case IssueActionTypes.TOGGLE_SORT_OPTIONS_BOX_ITEM:
			return { ...state, isSortOptionBoxItemActive: !state.isSortOptionBoxItemActive };
		case IssueActionTypes.TOGGLE_DELETE_ISSUES:
			return { ...state, isShowingDeleteButton: !state.isShowingDeleteButton };
		case IssueActionTypes.TOGGLE_EDIT_ISSUES:
			return { ...state, isShowingEditButton: !state.isShowingEditButton };
		case IssueActionTypes.SET_LABEL_FILTER:
			return { ...state, labelFilter: action.payload };
		case IssueActionTypes.SET_SORT_TYPE:
			return { ...state, sortType: action.payload };
		case IssueActionTypes.SET_STATUS_FILTER:
			return { ...state, statusFilter: action.payload };
		default:
			return state;
	}
};
