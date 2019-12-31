import { createSelector } from 'reselect';

const selectProject = (state) => state.project;

export const selectToggleDeleteProject = createSelector([ selectProject ], (project) => project.toggleDeleteProject);
export const selectToggleDeleteProjectModal = createSelector(
	[ selectProject ],
	(project) => project.toggleDeleteProjectModal
);
export const selectToggleCreateProject = createSelector([ selectProject ], (project) => project.toggleCreateProject);
export const selectProjects = createSelector([ selectProject ], (project) => project.projects);

export const selectProjectId = createSelector([ selectProject ], (project) => project.projectId);

export const selectProjectName = createSelector(
	[ selectProjects, selectProjectId ],
	(projects, projectId) =>
		Array.isArray(projects) && projects.length > 0 ? projects.find((project) => project._id === projectId).name : []
);
