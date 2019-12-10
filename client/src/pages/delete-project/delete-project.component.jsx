import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import { connect } from 'react-redux';
import { toggleDeleteProjectModal } from '../../redux/project/project.actions';
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
			window.location.reload();
		});
	};

	render() {
		return (
			<ModalPage
				handleSubmit={this.handleSubmit}
				toggleModal={this.props.toggleDeleteProjectModal}
				title="Delete"
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
		toggleDeleteProjectModal: () => dispatch(toggleDeleteProjectModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProject);
