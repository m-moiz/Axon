import React, { Component } from 'react';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import DeleteIssue from '../delete-issue/delete-issue.component';
import EditIssue from '../edit-issue/edit-issue.component';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import Modal from '../../components/modal/modal.components';
import TopMessage from '../../components/top-message/top-message.component';
import DetailsBox from '../../components/details-box/details-box.component';
import DescriptionBox from '../../components/description-box/description-box.component';
import StatusIcon from '../../components/status-icon/status-icon.component';
import CommentList from '../../components/comment-list/comment-list.component';
import CreateComment from '../../components/create-comment/create-comment.component';
import axios from 'axios';
import styled from 'styled-components';
import { toggleDeleteIssueModal, toggleEditIssues } from '../../redux/issue/issue.actions';
import { selectIsDeleteIssueModalOpen, selectIsEditIssueModalOpen } from '../../redux/issue/issue.selectors';
import { selectProjectName } from '../../redux/project/project.selectors';
import { selectIssueId, selectCurrentIssue } from '../../redux/issue/issue.selectors';
import { selectUsername } from '../../redux/user/user.selectors';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { selectMessageText } from '../../redux/message/message.selectors';
import { setCommentsArray } from '../../redux/comment/comment.actions';
import { connect } from 'react-redux';

const Title = styled.h3`
	margin: 0;
	padding: 0;
	position: relative;
	width: fit-content;
	top: 1.57rem;
	color: white;

	@media screen and (max-width: 900px) {
		font-size: 1.4rem;
	}

	@media screen and (max-width: 700px) {
		font-size: 1.2rem;
	}

	@media screen and (max-width: 600px) {
		font-size: 1.0rem;
	}

	@media screen and (max-width: 400px) {
		font-size: .9rem;
	}
`;

class IssuePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentText: ''
		};
	}

	componentDidMount() {
		axios
			.get(`/api/comment/${this.props.issueId}`)
			.then((resp) => {
				this.props.setCommentsArray(resp.data.comments);
			})
			.catch((err) => console.log(err));
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

		const { username, comments, projectName } = this.props;

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
					goBackTo="/user/issues"
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
					<div style={{ position: 'relative', left: '2%', display: 'flex', flexDirection: 'column' }}>
						<Title>
							{' '}
							{projectName}/{summary}{' '}
						</Title>
						<StatusIcon status={status} />
						<DetailsBox
							label={issueType}
							priority={priorityType}
							environment={environment}
							dueDate={dueDate}
							version={version}
							creationDate={creationDate}
							reporter={reporter}
						/>
						<DescriptionBox content={description} />
						<CommentList comments={comments} />
						<CreateComment username={username} />
					</div>
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
		currentIssue: selectCurrentIssue(state),
		username: selectUsername(state),
		comments: state.comment.comments
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleDeleteIssueModal: () => dispatch(toggleDeleteIssueModal()),
		toggleEditIssues: () => dispatch(toggleEditIssues()),
		setCommentsArray: (comments) => dispatch(setCommentsArray(comments))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuePage);
