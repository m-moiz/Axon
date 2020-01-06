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
	toggleEditIssues,
	toggleDeleteIssues
} from '../../redux/issue/issue.actions';
import { selectUserId } from '../../redux/user/user.selectors';
import {
	selectIsCreateIssueModalOpen,
	selectIsDeleteIssueModalOpen,
	selectIsEditIssueModalOpen,
	selectIsSortOptionsBoxOpen,
	selectIsLabelOptionsBoxOpen,
	selectIsStatusOptionsBoxOpen,
	selectFilteredIssues,
	selectIsShowingDeleteButton,
	selectIsShowingEditButton
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
	top: 1.47rem;
`;

class IssuesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortOptions: [ 'Newest', 'Oldest', 'Highest Priority', 'Lowest Priority', 'Most votes', 'Least votes' ],
			statusOptions: [ 'Open', 'Closed' ],
			labelOptions: [ 'Improvement', 'Feature', 'Bug', 'Task', 'Epic' ]
		};
	}

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
					isDeleting={this.props.isShowingDeleteButton}
					isEditing={this.props.isShowingEditButton}
					toggleDelete={this.props.toggleDeleteIssues}
					toggleCreate={this.props.toggleCreateIssueModal}
					toggleEdit={this.props.toggleEditIssues}
					addToolTipText="Create Issue"
					editToolTipText="Edit Issue"
					deleteToolTipText="Delete Issue"
					isSidebarOpen={this.props.isSidebarOpen}
				/>

				<PageContentContainer>
					{this.props.isSortOptionsBoxOpen ? (
						<OptionsBox
							listItems={this.state.sortOptions}
							headerTitle="Sort By"
							right="28vw"
							bottom="20vh"
						/>
					) : (
						''
					)}
					{this.props.isStatusOptionsBoxOpen ? (
						<OptionsBox
							listItems={this.state.statusOptions}
							headerTitle="Filter By"
							right="20vw"
							bottom="49vh"
						/>
					) : (
						''
					)}
					{this.props.isLabelOptionsBoxOpen ? (
						<OptionsBox
							listItems={this.state.labelOptions}
							headerTitle="Filter By"
							right="10vw"
							bottom="27vh"
						/>
					) : (
						''
					)}
					<Title> {this.props.projectName} </Title>
					<SearchBar />

					<Table items={this.props.issues} />

					{!this.props.isShowingDeleteButton ? (
						<AddButton toggleModal={this.props.toggleCreateIssueModal} />
					) : (
						''
					)}
				</PageContentContainer>
			</PageContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isShowingDeleteButton: selectIsShowingDeleteButton(state),
		isShowingEditButton: selectIsShowingEditButton(state),
		isCreateIssueModalOpen: selectIsCreateIssueModalOpen(state),
		isDeleteIssueModalOpen: selectIsDeleteIssueModalOpen(state),
		isEditIssueModalOpen: selectIsEditIssueModalOpen(state),
		isSortOptionsBoxOpen: selectIsSortOptionsBoxOpen(state),
		isLabelOptionsBoxOpen: selectIsLabelOptionsBoxOpen(state),
		isStatusOptionsBoxOpen: selectIsStatusOptionsBoxOpen(state),
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
		toggleEditIssues: () => dispatch(toggleEditIssues()),
		toggleDeleteIssues: () => dispatch(toggleDeleteIssues())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);
