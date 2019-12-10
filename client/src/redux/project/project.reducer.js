import { projectActionTypes } from './project.types';

const INITIAL_STATE = {
	toggleDeleteProject: false,
	toggleDeleteProjectModal: false,
	toggleCreateProject: false,
	projects: [],
	projectId: ''
};

export const projectReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case projectActionTypes.TOGGLE_CREATE_PROJECT:
			return Object.assign({}, state, { toggleCreateProject: !state.toggleCreateProject });
		case projectActionTypes.TOGGLE_DELETE_PROJECT:
			return Object.assign({}, state, { toggleDeleteProject: !state.toggleDeleteProject });
		case projectActionTypes.TOGGLE_DELETE_PROJECT_MODAL:
			return Object.assign({}, state, { toggleDeleteProjectModal: !state.toggleDeleteProjectModal });
		case projectActionTypes.SET_PROJECTS_ARRAY:
			return Object.assign({}, state, { projects: action.payload });
		case projectActionTypes.SET_PROJECT_ID:
			return Object.assign({}, state, { projectId: action.payload });
		default:
			return state;
	}
};
