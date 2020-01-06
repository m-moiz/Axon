import React, { Component } from 'react';
import AddButton from '../../components/add-button/add-button.component';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import DeleteIssue from '../delete-issue/delete-issue.component';
import EditIssue from '../edit-issue/edit-issue.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import Modal from '../../components/modal/modal.components';
import TopMessage from '../../components/top-message/top-message.component';
import styled from 'styled-components';
import { toggleDeleteIssueModal, toggleEditIssues } from '../../redux/issue/issue.actions';
import { selectIsDeleteIssueModalOpen, selectIsEditIssueModalOpen } from '../../redux/issue/issue.selectors';
import { selectProjectName } from '../../redux/project/project.selectors';
import { selectIssueId } from '../../redux/issue/issue.selectors';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { selectMessageText } from '../../redux/message/message.selectors';
import { connect } from 'react-redux';

const Title = styled.h3`
	margin: 0;
	padding: 0;
	position: relative;
	width: fit-content;
	left: 17%;
	top: 1.57rem;
`;

class IssuePage extends Component {
	render() {
		return (
			<PageContainer>
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
					toggleDelete={this.props.toggleDeleteIssuesl}
					toggleEdit={this.props.toggleEditIssues}
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issue"
					isSidebarOpen={this.props.isSidebarOpen}
				/>

				<PageContentContainer>
					<Title> {this.props.projectName} </Title>
					<AddButton toggleModal={this.props.toggleCreateIssueModal} />
				</PageContentContainer>
			</PageContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isDeleteIssueModalOpen: selectIsDeleteIssueModalOpen(state),
		isEditIssueModalOpen: selectIsEditIssueModalOpen(state),
		issueId: selectIssueId(state),
		projectName: selectProjectName(state),
		isSidebarOpen: selectIsSidebarOpen(state),
		messageText: selectMessageText(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleDeleteIssueModal: () => dispatch(toggleDeleteIssueModal()),
		toggleEditIssues: () => dispatch(toggleEditIssues())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuePage);
