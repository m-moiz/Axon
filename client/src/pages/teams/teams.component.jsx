import React, { Component } from 'react';
import './projects.styles.scss';
import Modal from '../../components/modal/modal.components';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import ItemList from '../../components/project-list/project-list.component';
import AddButton from '../../components/add-button/add-button.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import TopMessage from '../../components/top-message/top-message.component';
import { selectTeamArray } from '../../redux/team/team.selectors';
import { setTeamArray } from '../../redux/team/team.selectors';
import { selectUserId, selectIsUserSignedIn } from '../../redux/user/user.selectors';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { selectShouldRenderMessage, selectMessageText } from '../../redux/message/message.selectors';
import { connect } from 'react-redux';
import axios from 'axios';

class TeamsPage extends Component {
	componentDidMount() {
		if (this.props.isSignedIn === false) {
			window.location = '/sign-in';
		}
		axios
			.get(`http://localhost:4001/api/teams`)
			.then((resp) => {
				this.props.setTeamArray(resp.data.result[0].teams);
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
					<ItemList projects={this.props.teams} />
					<AddButton toggleModal={this.props.toggleCreateProjectModal} />
				</PageContentContainer>
			</PageContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: selectUserId(state),
		teams: selectTeamArray(state),
		isSignedIn: selectIsUserSignedIn(state),
		shouldRenderMessage: selectShouldRenderMessage(state),
		messageText: selectMessageText(state),
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setTeamsArray: (array) => dispatch(setTeamArray(array))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
