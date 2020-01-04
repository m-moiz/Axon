import { projectActionTypes } from './project.types';

export const toggleCreateProjectModal = () => ({
	type: projectActionTypes.TOGGLE_CREATE_PROJECT_MODAL
});

export const toggleEditProjectModal = () => ({
	type: projectActionTypes.TOGGLE_EDIT_PROJECT_MODAL
});

export const setProjectsArray = (projects) => ({
	type: projectActionTypes.SET_PROJECTS_ARRAY,
	payload: projects
});

export const toggleDeleteProjects = () => ({
	type: projectActionTypes.TOGGLE_DELETE_PROJECTS
});

export const toggleDeleteProjectModal = () => ({
	type: projectActionTypes.TOGGLE_DELETE_PROJECT_MODAL
});

export const setProjectId = (id) => ({
	type: projectActionTypes.SET_PROJECT_ID,
	payload: id
});
