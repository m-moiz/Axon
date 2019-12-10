import React from 'react';
import './project-list.styles.scss';

import Project from '../project/project.component';

const ProjectList = ({ projects }) => (
	<div className="project-list">
		<div className="project-list-container">
			{projects.length === 0 ? (
				<div>You don't have any projects. Create one by clicking the add button</div>
			) : (
				projects.map((project) => (
					<Project key={project._id} projectDesc={project.description}>
						{project.name}
					</Project>
				))
			)}
		</div>
	</div>
);

export default ProjectList;
