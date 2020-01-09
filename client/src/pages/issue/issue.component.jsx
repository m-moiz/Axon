import React, { Component } from 'react';
import AddButton from '../../components/add-button/add-button.component';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import DeleteIssue from '../delete-issue/delete-issue.component';
import EditIssue from '../edit-issue/edit-issue.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import Modal from '../../components/modal/modal.components';
import TopMessage from '../../components/top-message/top-message.component';
import DetailsBox from '../../components/details-box/details-box.component';
import DescriptionBox from '../../components/description-box/description-box.component';
import styled from 'styled-components';
import { toggleDeleteIssueModal, toggleEditIssues } from '../../redux/issue/issue.actions';
import { selectIsDeleteIssueModalOpen, selectIsEditIssueModalOpen } from '../../redux/issue/issue.selectors';
import { selectProjectName } from '../../redux/project/project.selectors';
import { selectIssueId, selectIssueDescription, selectCurrentIssue } from '../../redux/issue/issue.selectors';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { selectMessageText } from '../../redux/message/message.selectors';
import { connect } from 'react-redux';

const Title = styled.h3`
	margin: 0;
	padding: 0;
	position: relative;
	width: fit-content;
	top: 1.57rem;
	color: white;
`;

class IssuePage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {
			description,
			priorityType,
			environment,
			issueType,
			status,
			version,
			dueDate,
			creationDate,
			summary,
			reporter
		} = this.props.currentIssue[0];
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
					showGoBack
					title="Issues"
					toggleDelete={this.props.toggleDeleteIssues}
					toggleEdit={this.props.toggleEditIssues}
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issue"
					showEditTool
					showDeleteTool
					isSidebarOpen={this.props.isSidebarOpen}
				/>
				<PageContentContainer>
					<div style={{ position: 'relative', left: '2%' }}>
						<Title> {summary} </Title>

						<DetailsBox label={issueType} priority={priorityType} environment={environment} />
						<DescriptionBox content={this.props.description} />
					</div>

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
		messageText: selectMessageText(state),
		description: selectIssueDescription(state),
		currentIssue: selectCurrentIssue(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleDeleteIssueModal: () => dispatch(toggleDeleteIssueModal()),
		toggleEditIssues: () => dispatch(toggleEditIssues())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuePage);
