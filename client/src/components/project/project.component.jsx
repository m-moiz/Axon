import React from 'react';
import PropTypes from 'prop-types';
import './project.styles.scss';
import CloseButton from '../close-button/close-button.component';
import EditButon from '../edit-button/edit-button.component';
import { setProjectId, toggleDeleteProjectModal, toggleEditProjectModal } from '../../store/project/project.actions';
import { selectShouldDeleteProjects, selectShouldEditProjects } from '../../store/project/project.selectors';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Project = ({
	children,
	projectDesc,
	shouldDeleteProjects,
	shouldEditProjects,
	toggleEditProjectModal,
	toggleDeleteProjectModal,
	setProjectId,
	roles,
	history,
	projectId,
	teamId,
	isDarkTheme
}) => {
	const handleClick = () => {
		setProjectId(projectId);
		toggleEditProjectModal();
	};

	const canEditProject = roles.find((role) => role.resourceId === projectId && role.role === 'PROJECT_MANAGER');

	const canDeleteProject = roles.find((role) => role.resourceId === projectId && role.role === 'PROJECT_MANAGER');

	console.log(canEditProject, canDeleteProject);

	return (
		<div className={isDarkTheme ? 'project-container dark' : 'project-container light'}>
			{shouldDeleteProjects && canDeleteProject ? (
				<CloseButton
					action={() => {
						setProjectId(projectId);
						toggleDeleteProjectModal();
					}}
					top="12%"
					left="84%"
					fontSize="1rem"
				/>
			) : (
				''
			)}

			{shouldEditProjects && canEditProject ? (
				<div className="project-edit">
					{' '}
					<EditButon handleClick={handleClick} />{' '}
				</div>
			) : (
				''
			)}

			<div className="project">
				<a
					href="#"
					value={children}
					onClick={(e) => {
						setProjectId(projectId);
						history.push('/project/issues');
					}}
					className={isDarkTheme ? 'project-name dark' : 'project-name light'}
				>
					{children}
				</a>
				<h5 className="project-desc">{projectDesc}</h5>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setProjectId: (projectName) => dispatch(setProjectId(projectName)),
		toggleDeleteProjectModal: () => dispatch(toggleDeleteProjectModal()),
		toggleEditProjectModal: () => dispatch(toggleEditProjectModal())
	};
};

const mapStateToProps = (state) => {
	return {
		shouldDeleteProjects: selectShouldDeleteProjects(state),
		roles: state.user.roles,
		userId: state.user.userId,
		teamId: state.team.teamId,
		shouldEditProjects: selectShouldEditProjects(state),
		isDarkTheme: state.user.isDarkTheme
	};
};

Project.propTypes = {
	children: PropTypes.node,
	projectDesc: PropTypes.string,
	shouldDeleteProjects: PropTypes.bool,
	toggleDeleteProjectModal: PropTypes.func,
	setProjectId: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));
