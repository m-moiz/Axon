import React from 'react';
import './project.styles.scss';
import CloseButton from '../close-button/close-button.component';
import { setProjectId, toggleDeleteProjectModal } from '../../redux/project/project.actions';
import { connect } from 'react-redux';

const Project = ({ children, projectDesc, toggleDeleteProject, toggleDeleteProjectModal, setProjectId }) => (
	<div className="project-container">
		{toggleDeleteProject ? (
			<CloseButton
				action={(e) => {
					e.persist();
					setProjectId(e.nativeEvent.toElement.offsetParent.nextSibling.firstChild.textContent);
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
					setProjectId(e.currentTarget.getAttribute('value'));
					window.location = '/user/issues';
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
		toggleDeleteProject: state.project.toggleDeleteProject
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
