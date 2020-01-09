import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import { connect } from 'react-redux';
import { toggleDeleteProjectModal } from '../../redux/project/project.actions';
import { withRouter } from 'react-router-dom';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions';
import axios from 'axios';
import './delete-project.styles.scss';

class DeleteProject extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		axios({
			method: 'delete',
			url: `/api/project/${this.props.userId}&${this.props.projectId}/delete`
		}).then((res) => {
			this.props.toggleDeleteProjectModal();
			this.props.setMessageText('Deleted project successfully');
			this.props.closingMessageAfterOpening();
			this.props.history.push('/empty');
			this.props.history.replace('/projects');
		});
	};

	render() {
		return (
			<ModalPage
				height="40%"
				handleSubmit={this.handleSubmit}
				toggleModal={this.props.toggleDeleteProjectModal}
				title="Are you sure you want to delete ...?"
				closeButtonLeft="16%"
				closeButtonBottom="2rem"
				closeButtonFontSize="1.4rem"
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		projectId: state.project.projectId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening()),
		setMessageText: (message) => dispatch(setMessageText(message)),
		toggleDeleteProjectModal: () => dispatch(toggleDeleteProjectModal())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteProject));
