import React, { Component } from 'react';
import AddButton from '../../components/add-button/add-button.component';
import CreateIssue from '../create-issue/create-issue.component';
import DeleteIssue from '../delete-issue/delete-issue.component';
import EditIssue from '../edit-issue/edit-issue.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import Modal from '../../components/modal/modal.components';
import TopMessage from '../../components/top-message/top-message.component';
import SearchBar from '../../components/search-bar/search-bar.component';
import Table from '../../components/table/table.component';
import styled from 'styled-components';
import axios from 'axios';
import {
	setIssuesArray,
	toggleCreateIssueModal,
	toggleDeleteIssueModal,
	toggleEditIssueModal
} from '../../redux/issue/issue.actions';
import { selectUserId } from '../../redux/user/user.selectors';
import {
	selectIsCreateIssueModalOpen,
	selectIsDeleteIssueModalOpen,
	selectIsEditIssueModalOpen,
	selectFilteredIssues
} from '../../redux/issue/issue.selectors';
import { selectProjectName, selectProjectId } from '../../redux/project/project.selectors';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { selectMessageText } from '../../redux/message/message.selectors';
import { connect } from 'react-redux';

const Title = styled.h3`
	margin: 0;
	padding: 0;
	position: relative;
	width: fit-content;
	left: 17%;
	top: 1.97rem;
`;

class IssuesPage extends Component {
	componentDidMount() {
		axios
			.get(`http://localhost:4001/api/issue/${this.props.userId}&${this.props.projectId}`)
			.then((resp) => {
				console.log(resp);
				this.props.setIssuesArray(resp.data.result.projects[0].issues);
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div className="issues">
				{this.props.isCreateIssueModalOpen && (
					<Modal>
						<CreateIssue />
					</Modal>
				)}

				{this.props.isDeleteIssueModalOpen && (
					<Modal>
						<DeleteIssue />
					</Modal>
				)}

				{this.props.isEditIssueModalOpen && (
					<Modal>
						<EditIssue />
					</Modal>
				)}

				<TopMessage messageContent={this.props.messageText} />

				<SharedSidebar
					title="Issues"
					toggleCreate={this.props.toggleCreateIssueModal}
					toggleDelete={this.props.toggleDeleteIssueModal}
					toggleEdit={this.props.toggleEditIssueModal}
					addToolTipText="Create Issue"
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issue"
					isSidebarOpen={this.props.isSidebarOpen}
				/>

				<Title> {this.props.projectName} </Title>
				<SearchBar />

				<Table items={this.props.issues} />

				<AddButton toggleModal={this.props.toggleCreateIssueModal} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isCreateIssueModalOpen: selectIsCreateIssueModalOpen(state),
		isDeleteIssueModalOpen: selectIsDeleteIssueModalOpen(state),
		isEditIssueModalOpen: selectIsEditIssueModalOpen(state),
		userId: selectUserId(state),
		projectId: selectProjectId(state),
		issues: selectFilteredIssues(state),
		projectName: selectProjectName(state),
		isSidebarOpen: selectIsSidebarOpen(state),
		messageText: selectMessageText(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIssuesArray: (issues) => dispatch(setIssuesArray(issues)),
		toggleCreateIssueModal: () => dispatch(toggleCreateIssueModal()),
		toggleDeleteIssueModal: () => dispatch(toggleDeleteIssueModal()),
		toggleEditIssueModal: () => dispatch(toggleEditIssueModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);
