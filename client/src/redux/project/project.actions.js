import { projectActionTypes } from './project.types';

export const toggleCreateProject = () => ({
	type: projectActionTypes.TOGGLE_CREATE_PROJECT
});

export const setProjectsArray = (projects) => ({
	type: projectActionTypes.SET_PROJECTS_ARRAY,
	payload: projects
});

export const toggleDeleteProject = () => ({
	type: projectActionTypes.TOGGLE_DELETE_PROJECT
});

export const toggleDeleteProjectModal = () => ({
	type: projectActionTypes.TOGGLE_DELETE_PROJECT_MODAL
});

export const setProjectId = (projectName) => {
	return (dispatch, getState) => {
		const { projects } = getState().project;
		console.log(projects);
		//go through the fetched project array and find the specific project that the user clicked on
		const project = projects.filter((project) => project.name === projectName);
		const projectId = project[0]._id;

		dispatch({
			type: projectActionTypes.SET_PROJECT_ID,
			payload: projectId
		});
	};
};
