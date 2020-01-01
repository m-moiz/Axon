import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import { connect } from 'react-redux';
import { toggleDeleteIssueModal } from '../../redux/project/project.actions';
import { withRouter } from 'react-router-dom';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions';
import axios from 'axios';

class DeleteIssue extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		axios({
			method: 'delete',
			url: `/api/issue/${this.props.userId}&${this.props.projectId}&${this.props.issueId}/delete`
		}).then((res) => {
			this.props.toggleDeleteIssueModal();
			this.props.setMessageText('Deleted issue successfully');
			this.props.closingMessageAfterOpening();
			this.props.history.push('/empty');
			this.props.history.replace('/user/issues');
		});
	};

	render() {
		return (
			<ModalPage
				height="40%"
				handleSubmit={this.handleSubmit}
				toggleModal={this.props.toggleDeleteIssueModal}
				title="Are you sure you want to delete ...?"
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		projectId: state.project.projectId,
		issueId: state.issue.issueId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening()),
		setMessageText: (message) => dispatch(setMessageText(message)),
		toggleDeleteIssueModal: () => dispatch(toggleDeleteIssueModal())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteIssue));
