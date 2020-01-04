import React, { Component } from 'react';
import AddButton from '../../components/add-button/add-button.component';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import CreateIssue from '../create-issue/create-issue.component';
import DeleteIssue from '../delete-issue/delete-issue.component';
import EditIssue from '../edit-issue/edit-issue.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import Modal from '../../components/modal/modal.components';
import TopMessage from '../../components/top-message/top-message.component';
import SearchBar from '../../components/search-bar/search-bar.component';
import Table from '../../components/table/table.component';
import OptionsBox from '../../components/options-box/options-box.component';
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
	selectIsSortOptionsBoxOpen,
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
	left: 10%;
	top: 1.97rem;
`;

class IssuesPage extends Component {
	componentDidMount() {
		axios
			.get(`http://localhost:4001/api/issue/${this.props.userId}&${this.props.projectId}`)
			.then((resp) => {
				this.props.setIssuesArray(resp.data.result.projects[0].issues);
			})
			.catch((err) => console.log(err));
	}

	componentDidUpdate(prevProps) {
		console.log(prevProps);
		if (prevProps.projectName !== this.props.projectName) {
			axios
				.get(`http://localhost:4001/api/issue/${this.props.userId}&${this.props.projectId}`)
				.then((resp) => {
					this.props.setIssuesArray(resp.data.result.projects[0].issues);
				})
				.catch((err) => console.log(err));
		}
	}

	render() {
		return (
			<PageContainer>
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

				<PageContentContainer>
					{this.props.isSortOptionsBoxOpen ? <OptionsBox /> : ''}
					<Title> {this.props.projectName} </Title>
					<SearchBar />

					<Table items={this.props.issues} />

					<AddButton toggleModal={this.props.toggleCreateIssueModal} />
				</PageContentContainer>
			</PageContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isCreateIssueModalOpen: selectIsCreateIssueModalOpen(state),
		isDeleteIssueModalOpen: selectIsDeleteIssueModalOpen(state),
		isEditIssueModalOpen: selectIsEditIssueModalOpen(state),
		isSortOptionsBoxOpen: selectIsSortOptionsBoxOpen(state),
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
