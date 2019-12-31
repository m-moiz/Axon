import React, { Component } from 'react';
import './projects.styles.scss';
import Modal from '../../components/modal/modal.components';
import CreateProject from '../create-project/create-project.component';
import DeleteProject from '../delete-project/delete-project.component';
import ProjectList from '../../components/project-list/project-list.component';
import AddButton from '../../components/add-button/add-button.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import TopMessage from '../../components/top-message/top-message.component';
import { setProjectsArray, toggleCreateProject, toggleDeleteProject } from '../../redux/project/project.actions';
import { selectUserId, selectIsUserSignedIn } from '../../redux/user/user.selectors';
import {
	selectProjects,
	selectToggleCreateProject,
	selectToggleDeleteProject,
	selectToggleDeleteProjectModal
} from '../../redux/project/project.selectors';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { selectShouldRenderMessage, selectMessageText } from '../../redux/message/message.selectors';
import { connect } from 'react-redux';
import axios from 'axios';

class ProjectsPage extends Component {
	componentDidMount() {
		if (this.props.isSignedIn === false) {
			window.location = '/sign-in';
		}
		axios
			.get(`http://localhost:4001/api/projects/${this.props.userId}`)
			.then((resp) => {
				if (resp.data.result[0].projects === undefined) {
				} else {
					this.props.setProjectsArray(resp.data.result[0].projects);
				}
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className="project-page">
				{this.props.toggleModal && (
					<Modal>
						<CreateProject />
					</Modal>
				)}

				{this.props.toggleDeleteModal && (
					<Modal>
						<DeleteProject />
					</Modal>
				)}

				{this.props.shouldRenderMessage ? <TopMessage messageContent={this.props.messageText} /> : ''}

				<SharedSidebar
					title="Projects"
					toggleCreate={this.props.toggleCreateProject}
					toggleDelete={this.props.toggleDeleteProject}
					toggleTool={this.props.toggleDeleteProjects}
					addToolTipText="Create Project"
					editToolTipText="Edit Project"
					deleteToolTipText="Delete Projects"
					isSidebarOpen={this.props.isSidebarOpen}
				/>

				<ProjectList projects={this.props.projects} />
				<AddButton toggleModal={this.props.toggleCreateProject} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: selectUserId(state),
		isSignedIn: selectIsUserSignedIn(state),
		projects: selectProjects(state),
		toggleModal: selectToggleCreateProject(state),
		toggleDeleteModal: selectToggleDeleteProjectModal(state),
		toggleDeleteProjects: selectToggleDeleteProject(state),
		shouldRenderMessage: selectShouldRenderMessage(state),
		messageText: selectMessageText(state),
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setProjectsArray: (projects) => dispatch(setProjectsArray(projects)),
		toggleCreateProject: () => dispatch(toggleCreateProject()),
		toggleDeleteProject: () => dispatch(toggleDeleteProject())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
