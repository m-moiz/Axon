import React, { Component } from 'react';
import './projects.styles.scss';
import Modal from '../../components/modal/modal.components';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import ItemList from '../../components/item-list/item-list.component';
import AddButton from '../../components/add-button/add-button.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import TopMessage from '../../components/top-message/top-message.component';
import CreateTeam from '../create-team/create-team.component';
import EditTeam from '../edit-team/edit-team.component';
import DeleteTeam from '../delete-team/delete-team.component.jsx';
import { setTeamArray, toggleCreateTeamModal, toggleDeleteTeams, toggleEditTeams } from '../../redux/team/team.actions';
import {
	selectTeamArray,
	selectIsCreateTeamModalOpen,
	selectIsDeleteTeamModalOpen,
	selectIsEditTeamModalOpen,
	selectShouldDeleteTeams,
	selectShouldEditTeams
} from '../../redux/team/team.selectors';
import { setTeamArray } from '../../redux/team/team.selectors';
import { selectUserId, selectIsUserSignedIn } from '../../redux/user/user.selectors';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { selectShouldRenderMessage, selectMessageText } from '../../redux/message/message.selectors';
import { connect } from 'react-redux';
import axios from 'axios';

class TeamsPage extends Component {
	componentDidMount() {
		if (this.props.isSignedIn === false || !window.sessionStorage.getItem('token')) {
			window.location = '/sign-in';
		}

		axios({
			method: 'get',
			url: `/api/teams`,
			headers: {
				Authorization: window.sessionStorage.getItem('token')
			}
		})
			.then((resp) => {
				this.props.setTeamArray(resp.data.result[0].teams);
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<PageContainer>
				{this.props.isCreateTeamModalOpen && (
					<Modal>
						<CreateTeam />
					</Modal>
				)}

				{this.props.isDeleteTeamModalOpen && (
					<Modal>
						<DeleteTeam />
					</Modal>
				)}

				{this.props.isEditTeamModalOpen && (
					<Modal>
						<EditTeam />
					</Modal>
				)}

				<TopMessage messageContent={this.props.messageText} />

				<SharedSidebar
					title="Projects"
					showAddTool
					showEditTool
					showDeleteTool
					toggleCreate={this.props.toggleCreateTeamModal}
					toggleDelete={this.props.toggleDeleteTeams}
					toggleEdit={this.props.toggleEditTeams}
					isDeleting={this.props.shouldDeleteTeams}
					isEditing={this.props.shouldEditTeams}
					addToolTipText="Create Team"
					editToolTipText="Edit Team"
					deleteToolTipText="Delete Team"
					isSidebarOpen={this.props.isSidebarOpen}
				/>

				<PageContentContainer>
					<ItemList projects={this.props.teams} />
					<AddButton toggleModal={this.props.toggleCreateTeamModal} />
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
		isCreateTeamModalOpen: selectIsCreateTeamModalOpen(state),
		isDeleteTeamModalOpen: selectIsDeleteTeamModalOpen(state),
		isEditTeamModalOpen: selectIsEditTeamModalOpen(state),
		shouldDeleteTeams: selectShouldDeleteTeams(state),
		shouldEditTeams: selectShouldEditTeams(state),
		shouldRenderMessage: selectShouldRenderMessage(state),
		messageText: selectMessageText(state),
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setTeamsArray: (array) => dispatch(setTeamArray(array)),
		toggleCreateTeamModal: () => dispatch(toggleCreateTeamModal()),
		toggleDeleteTeams: () => dispatch(toggleDeleteTeams()),
		toggleEditTeams: () => dispatch(toggleEditTeams())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
