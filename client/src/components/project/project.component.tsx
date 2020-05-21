import React from 'react';
import { History } from 'history';
import './project.styles.scss';
import CloseButton from '../close-button/close-button.component';
import EditButon from '../edit-button/edit-button.component';
import { setProjectId, toggleDeleteProjectModal, toggleEditProjectModal } from '../../store/project/project.actions';
import { selectShouldDeleteProjects, selectShouldEditProjects } from '../../store/project/project.selectors';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

interface IProject {
	children: React.ReactNode;
	projectDesc: string;
	shouldDeleteProjects?: boolean;
	shouldEditProjects?: boolean;
	toggleEditProjectModal: () => void;
	toggleDeleteProjectModal: () => void;
	setProjectId: (id: string) => void;
	history: History;
	projectId: string;
	isDarkTheme?: boolean;
}

const Project = ({
	children,
	projectDesc,
	shouldDeleteProjects,
	shouldEditProjects,
	toggleEditProjectModal,
	toggleDeleteProjectModal,
	setProjectId,
	history,
	projectId,
	isDarkTheme
}: IProject) => {
	const handleClick = () => {
		setProjectId(projectId);
		toggleEditProjectModal();
	};

	return (
		<div className={isDarkTheme ? 'project-container dark' : 'project-container light'}>
			{shouldDeleteProjects ? (
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

			{shouldEditProjects ? (
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
					onClick={(e) => {
						setProjectId(projectId);
						history.push('/user/issues');
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
		shouldEditProjects: selectShouldEditProjects(state),
		isDarkTheme: state.user.isDarkTheme
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));
