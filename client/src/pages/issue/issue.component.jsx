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
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { toggleDeleteIssueModal, toggleEditIssues, setCurrentIssue } from '../../store/issue/issue.actions';
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

class IssuePage extends Component {
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
			url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${this.props.issueId}&
			${this.props.userId}/toggleStatus`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.sessionStorage.getItem('token')
			},
			data: {
				prevStatus: e.target.value
			}
		}).catch((err) => console.log(err));
	};

	async componentDidMount() {
		const rep = await axios({
			method: 'get',
			url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${this.props.match.params.issueId}`,
			headers: {
				Authorization: window.sessionStorage.getItem('token')
			}
		});

		this.props.setCurrentIssue(
			rep.data.issue.projects[0].issues.find((issue) => issue._id === this.props.match.params.issueId)
		);

		const resp = await axios({
			method: 'get',
			url: `/api/comment/${this.props.match.params.issueId}`,
			headers: {
				Authorization: window.sessionStorage.getItem('token')
			}
		});

		this.props.setCommentsArray(resp.data.comments);
	}

	render() {
		const { username, comments, projectName } = this.props;

		const isCreator = this.props.userId === this.props.currentIssue.creator;

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
					goBackTo="/project/issues"
					title="Issues"
					toggleDelete={this.props.toggleDeleteIssues}
					toggleEdit={this.props.toggleEditIssues}
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issue"
					showEditTool={isCreator}
					showDeleteTool={isCreator}
					isSidebarOpen={this.props.isSidebarOpen}
				/>
				<PageContentContainer>
					<div style={{ position: 'relative', left: '2%', display: 'flex', flexDirection: 'column' }}>
						<Title isDarkTheme={this.props.isDarkTheme}>
							{' '}
							{projectName}/{this.props.currentIssue.summary}{' '}
						</Title>
						<StatusIcon
							isInteractible={true}
							handleClick={this.handleStatusClick}
							status={this.props.currentIssue.status}
						/>

						<DetailsBox
							isDetailsVisible={this.state.isDetailsVisible}
							toggleDetails={this.toggleDetails}
							label={this.props.currentIssue.issueType}
							priority={this.props.currentIssue.priorityType}
							environment={this.props.currentIssue.environment}
							dueDate={this.props.currentIssue.dueDate}
							version={this.props.currentIssue.version}
							creationDate={this.props.currentIssue.creationDate}
							reporter={this.props.currentIssue.reporter}
						/>

						{this.props.currentIssue.description ? (
							<DescriptionBox
								isDescriptionVisible={this.state.isDescriptionVisible}
								toggleDescription={this.toggleDescription}
								content={JSON.parse(this.props.currentIssue.description)}
							/>
						) : (
							''
						)}

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
		userId: state.user.userId,
		issueId: selectIssueId(state),
		teamId: state.team.teamId,
		projectId: state.project.projectId,
		projectName: selectProjectName(state),
		isSidebarOpen: selectIsSidebarOpen(state),
		messageText: selectMessageText(state),
		currentIssue: state.issue.currentIssue,
		username: selectUsername(state),
		comments: state.comment.comments,
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleDeleteIssueModal: () => dispatch(toggleDeleteIssueModal()),
		setCurrentIssue: (issue) => dispatch(setCurrentIssue(issue)),
		toggleEditIssues: () => dispatch(toggleEditIssues()),
		setCommentsArray: (comments) => dispatch(setCommentsArray(comments))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IssuePage));
