import React from 'react';
import PropTypes from 'prop-types';
import './project.styles.scss';
import CloseButton from '../close-button/close-button.component';
import { setProjectId, toggleDeleteProjectModal } from '../../redux/project/project.actions';
import { selectShouldDeleteProjects } from '../../redux/project/project.selectors';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Project = ({
	children,
	projectDesc,
	shouldDeleteProjects,
	toggleDeleteProjectModal,
	setProjectId,
	history,
	projectId
}) => (
	<div className="project-container">
		{shouldDeleteProjects ? (
			<CloseButton
				action={(e) => {
					e.persist();
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

		<div className="project">
			<h4
				value={children}
				onClick={(e) => {
					setProjectId(projectId);
					history.push('/user/issues');
				}}
				className="project-name"
			>
				{children}
			</h4>
			<h5 className="project-desc">{projectDesc}</h5>
		</div>
	</div>
);

const mapDispatchToProps = (dispatch) => {
	return {
		setProjectId: (projectName) => dispatch(setProjectId(projectName)),
		toggleDeleteProjectModal: () => dispatch(toggleDeleteProjectModal())
	};
};

const mapStateToProps = (state) => {
	return {
		shouldDeleteProjects: selectShouldDeleteProjects(state)
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
