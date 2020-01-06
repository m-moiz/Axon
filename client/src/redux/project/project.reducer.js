import { projectActionTypes } from './project.types';

const INITIAL_STATE = {
	shouldDeleteProjects: false,
	shouldEditProjects: false,
	isDeleteProjectModalOpen: false,
	isCreateProjectModalOpen: false,
	isEditProjectModalOpen: false,
	projects: [],
	projectId: ''
};

export const projectReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case projectActionTypes.TOGGLE_CREATE_PROJECT_MODAL:
			return Object.assign({}, state, { isCreateProjectModalOpen: !state.isCreateProjectModalOpen });
		case projectActionTypes.TOGGLE_DELETE_PROJECTS:
			return Object.assign({}, state, { shouldDeleteProjects: !state.shouldDeleteProjects });
		case projectActionTypes.TOGGLE_EDIT_PROJECTS:
			return Object.assign({}, state, { shouldEditProjects: !state.shouldEditProjects });
		case projectActionTypes.TOGGLE_DELETE_PROJECT_MODAL:
			return Object.assign({}, state, { isDeleteProjectModalOpen: !state.isDeleteProjectModalOpen });
		case projectActionTypes.TOGGLE_EDIT_PROJECT_MODAL:
			return Object.assign({}, state, { isEditProjectModalOpen: !state.isEditProjectModalOpen });
		case projectActionTypes.SET_PROJECTS_ARRAY:
			return Object.assign({}, state, { projects: action.payload });
		case projectActionTypes.SET_PROJECT_ID:
			return Object.assign({}, state, { projectId: action.payload });
		default:
			return state;
	}
};
