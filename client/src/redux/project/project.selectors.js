import { createSelector } from 'reselect';

const selectProject = (state) => state.project;
export const selectShouldDeleteProjects = createSelector([ selectProject ], (project) => project.shouldDeleteProjects);

export const selectIsDeleteProjectModalOpen = createSelector(
	[ selectProject ],
	(project) => project.isDeleteProjectModalOpen
);

export const selectIsCreateProjectModalOpen = createSelector(
	[ selectProject ],
	(project) => project.isCreateProjectModalOpen
);

export const selectisEditProjectModalOpen = createSelector(
	[ selectProject ],
	(project) => project.isEditProjectModalOpen
);

export const selectProjects = createSelector([ selectProject ], (project) => project.projects);
export const selectProjectId = createSelector([ selectProject ], (project) => project.projectId);

export const selectProjectName = createSelector(
	[ selectProjects, selectProjectId ],
	(projects, projectId) =>
		Array.isArray(projects) && projects.length > 0 ? projects.find((project) => project._id === projectId).name : []
);
