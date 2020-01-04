import React, { Component } from 'react';
import './projects.styles.scss';
import Modal from '../../components/modal/modal.components';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import CreateProject from '../create-project/create-project.component';
import DeleteProject from '../delete-project/delete-project.component';
import EditProject from '../edit-project/edit-project.component';
import ProjectList from '../../components/project-list/project-list.component';
import AddButton from '../../components/add-button/add-button.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import TopMessage from '../../components/top-message/top-message.component';
import {
	setProjectsArray,
	toggleCreateProjectModal,
	toggleDeleteProjectModal,
	toggleDeleteProjects
} from '../../redux/project/project.actions';
import { selectUserId, selectIsUserSignedIn } from '../../redux/user/user.selectors';
import {
	selectProjects,
	selectIsCreateProjectModalOpen,
	selectIsDeleteProjectModalOpen,
	selectisEditProjectModalOpen,
	selectShouldDeleteProjects
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
			<PageContainer>
				{this.props.isCreateProjectModalOpen && (
					<Modal>
						<CreateProject />
					</Modal>
				)}

				{this.props.isDeleteProjectModalOpen && (
					<Modal>
						<DeleteProject />
					</Modal>
				)}

				{this.props.isEditProjectModalOpen && (
					<Modal>
						<EditProject />
					</Modal>
				)}

				<TopMessage messageContent={this.props.messageText} />

				<SharedSidebar
					title="Projects"
					toggleCreate={this.props.toggleCreateProjectModal}
					toggleDelete={this.props.toggleDeleteProjects}
					toggleTool={this.props.shouldDeleteProjects}
					addToolTipText="Create Project"
					editToolTipText="Edit Project"
					deleteToolTipText="Delete Projects"
					isSidebarOpen={this.props.isSidebarOpen}
				/>
				<PageContentContainer>
					<ProjectList projects={this.props.projects} />
					<AddButton toggleModal={this.props.toggleCreateProjectModal} />
				</PageContentContainer>
			</PageContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: selectUserId(state),
		isSignedIn: selectIsUserSignedIn(state),
		projects: selectProjects(state),
		isCreateProjectModalOpen: selectIsCreateProjectModalOpen(state),
		isDeleteProjectModalOpen: selectIsDeleteProjectModalOpen(state),
		isEditProjectModalOpen: selectisEditProjectModalOpen(state),
		shouldDeleteProjects: selectShouldDeleteProjects(state),
		shouldRenderMessage: selectShouldRenderMessage(state),
		messageText: selectMessageText(state),
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setProjectsArray: (projects) => dispatch(setProjectsArray(projects)),
		toggleCreateProjectModal: () => dispatch(toggleCreateProjectModal()),
		toggleDeleteProjectModal: () => dispatch(toggleDeleteProjectModal()),
		toggleDeleteProjects: () => dispatch(toggleDeleteProjects())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
