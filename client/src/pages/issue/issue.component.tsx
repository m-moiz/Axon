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
import { toggleDeleteIssueModal, toggleEditIssues } from '../../store/issue/issue.actions';
import { selectIsDeleteIssueModalOpen, selectIsEditIssueModalOpen } from '../../store/issue/issue.selectors';
import { selectProjectName } from '../../store/project/project.selectors';
import { selectIssueId, selectCurrentIssue } from '../../store/issue/issue.selectors';
import { selectUsername } from '../../store/user/user.selectors';
import { selectIsSidebarOpen } from '../../store/sidebar/sidebar.selectors';
import { selectMessageText } from '../../store/message/message.selectors';
import { setCommentsArray } from '../../store/comment/comment.actions';
import { connect } from 'react-redux';

const Title = styled.h3`
	margin: 0;
	padding: 0;
	position: relative;
	width: fit-content;
	top: 1.57rem;
	color: ${(props) => (props.isDarkTheme ? 'white' : '#5a5a5a')};

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

interface IIssuePageProps {
	teamId: string;
	issueId: string;
	projectId: string;
	username: string;
	comments: Comment[];
	projectName: string;
	isDeleteIssueModalOpen(): void;
	setCommentsArray(comments: Comment[]): void;
	toggleDeleteIssues(): void;
	toggleEditIssues(): void;
	currentIssue: Issue[];
	isEditIssueModalOpen: boolean;
	isSidebarOpen: boolean;
	isDarkTheme: boolean;
	messageText: string;
	isSignedIn: boolean;
}

interface IIssuePageState {
	commentText: string;
	isDescriptionVisible: boolean;
	isDetailsVisible: boolean;
	isCommentsVisible: boolean;
}

class IssuePage extends Component<IIssuePageProps, IIssuePageState> {
	constructor(props) {
		super(props);
		this.state = {
			commentText: '',
			isDescriptionVisible: true,
			isDetailsVisible: true,
			isCommentsVisible: true
		};
	}

	toggleDescription = () => {
		this.setState((prevState) => ({
			isDescriptionVisible: !prevState.isDescriptionVisible
		}));
	};

	toggleDetails = () => {
		this.setState((prevState) => ({
			isDetailsVisible: !prevState.isDetailsVisible
		}));
	};

	toggleComments = () => {
		this.setState((prevState) => ({
			isCommentsVisible: !prevState.isCommentsVisible
		}));
	};

	handleStatusClick = (e) => {
		if (this.props.isSignedIn === false || !window.sessionStorage.getItem('token')) {
			window.location = '/sign-in';
		}

		axios({
			method: 'put',
			url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${this.props.issueId}/toggleStatus`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.sessionStorage.getItem('token')
			},
			data: {
				prevStatus: e.target.value
			}
		}).catch((err) => console.log(err));
	};

	componentDidMount() {
		axios({
			method: 'get',
			url: `/api/comment/${this.props.issueId}`,
			headers: {
				Authorization: window.sessionStorage.getItem('token')
			}
		})
			.then((resp) => {
				this.props.setCommentsArray(resp.data.comments);
			})
			.catch((err) => console.log(err));
	}

	render() {
		const {
			createdBy,
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

		let isInteractible = false;
		if (createdBy === username) {
			isInteractible = true;
		}

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
						<Title isDarkTheme={this.props.isDarkTheme}>
							{' '}
							{projectName}/{summary}{' '}
						</Title>
						<StatusIcon
							isInteractible={isInteractible}
							handleClick={this.handleStatusClick}
							status={status}
						/>
						<DetailsBox
							isDetailsVisible={this.state.isDetailsVisible}
							toggleDetails={this.toggleDetails}
							label={issueType}
							priority={priorityType}
							environment={environment}
							dueDate={dueDate}
							version={version}
							creationDate={creationDate}
							reporter={reporter}
						/>
						<DescriptionBox
							isDescriptionVisible={this.state.isDescriptionVisible}
							toggleDescription={this.toggleDescription}
							content={JSON.parse(description)}
						/>
						<CommentList
							isCommentsVisible={this.state.isCommentsVisible}
							toggleComments={this.toggleComments}
							comments={comments}
						/>
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
		teamId: state.team.teamId,
		projectId: state.project.projectId,
		projectName: selectProjectName(state),
		isSidebarOpen: selectIsSidebarOpen(state),
		messageText: selectMessageText(state),
		currentIssue: selectCurrentIssue(state),
		username: selectUsername(state),
		comments: state.comment.comments,
		isDarkTheme: state.user.isDarkTheme
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
