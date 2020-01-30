import React, { Component } from 'react';
import './projects.styles.scss';
import Modal from '../../components/modal/modal.components';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import CreateProject from '../create-project/create-project.component';
import TabBar from '../../components/tab-bar/tab-bar.component';
import DeleteProject from '../delete-project/delete-project.component';
import EditProject from '../edit-project/edit-project.component';
import ItemList from '../../components/item-list/item-list.component';
import AddButton from '../../components/add-button/add-button.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import TopMessage from '../../components/top-message/top-message.component';
import {
	setProjectsArray,
	toggleCreateProjectModal,
	toggleDeleteProjects,
	toggleEditProjects
} from '../../redux/project/project.actions';
import { selectTeamId, selectTeamArray } from '../../redux/team/team.selectors';
import { selectUserId, selectIsUserSignedIn } from '../../redux/user/user.selectors';
import {
	selectProjects,
	selectIsCreateProjectModalOpen,
	selectIsDeleteProjectModalOpen,
	selectIsEditProjectModalOpen,
	selectShouldDeleteProjects,
	selectShouldEditProjects
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
			.get(`api/projects/${this.props.teamId}`)
			.then((resp) => {
				console.log(resp);
				if (resp.data.result[0].projects === undefined) {
				} else {
					this.props.setProjectsArray(resp.data.result[0].projects);
				}
			})
			.catch((err) => console.log(err));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.teamId !== this.props.teamId) {
			axios
				.get(`/api/projects/${this.props.teamId}`)
				.then((resp) => {
					if (resp.data.result[0].projects === undefined) {
					} else {
						this.props.setProjectsArray(resp.data.result[0].projects);
					}
				})
				.catch((err) => console.log(err));
		}
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
					showAddTool
					showEditTool
					showDeleteTool
					toggleCreate={this.props.toggleCreateProjectModal}
					toggleDelete={this.props.toggleDeleteProjects}
					toggleEdit={this.props.toggleEditProjects}
					isDeleting={this.props.shouldDeleteProjects}
					isEditing={this.props.shouldEditProjects}
					addToolTipText="Create Project"
					editToolTipText="Edit Project"
					deleteToolTipText="Delete Projects"
					isSidebarOpen={this.props.isSidebarOpen}
				/>
				<PageContentContainer>
					<TabBar items={this.props.teams} />
					<ItemList items={this.props.projects} itemName="project" />
					<AddButton toggleModal={this.props.toggleCreateProjectModal} />
				</PageContentContainer>
			</PageContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: selectUserId(state),
		teamId: selectTeamId(state),
		teams: selectTeamArray(state),
		isSignedIn: selectIsUserSignedIn(state),
		projects: selectProjects(state),
		isCreateProjectModalOpen: selectIsCreateProjectModalOpen(state),
		isDeleteProjectModalOpen: selectIsDeleteProjectModalOpen(state),
		isEditProjectModalOpen: selectIsEditProjectModalOpen(state),
		shouldDeleteProjects: selectShouldDeleteProjects(state),
		shouldEditProjects: selectShouldEditProjects(state),
		shouldRenderMessage: selectShouldRenderMessage(state),
		messageText: selectMessageText(state),
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setProjectsArray: (projects) => dispatch(setProjectsArray(projects)),
		toggleCreateProjectModal: () => dispatch(toggleCreateProjectModal()),
		toggleDeleteProjects: () => dispatch(toggleDeleteProjects()),
		toggleEditProjects: () => dispatch(toggleEditProjects())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
