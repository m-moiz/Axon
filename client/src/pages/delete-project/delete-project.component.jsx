import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import { selectTeamId } from '../../redux/team/team.selectors';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { toggleDeleteProjectModal } from '../../redux/project/project.actions';
import { withRouter } from 'react-router-dom';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions';
import axios from 'axios';
import './delete-project.styles.scss';

class DeleteProject extends Component {
	render() {
		return (
			<ModalPage style="small">
				<Formik
					initialValues={{}}
					onSubmit={() => {
						axios({
							method: 'delete',
							url: `/api/project/${this.props.teamId}&${this.props.projectId}/delete`
						}).then((res) => {
							if (res.data.message === 'Successfully deleted project') {
								this.props.toggleDeleteProjectModal();
								this.props.setMessageText('Deleted project successfully');
								this.props.closingMessageAfterOpening();
								this.props.history.push('/empty');
								this.props.history.replace('/projects');
							}
						});
					}}
				>
					{({ handleSubmit }) => (
						<Form
							onSubmit={handleSubmit}
							style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
						>
							<div className="form-head">
								<h3 className="modal-page-title">Delete Project</h3>
								<CloseButton
									fontSize="1.4rem"
									left="56%"
									bottom=".5rem"
									color="grey"
									action={this.props.toggleDeleteProjectModal}
								/>
							</div>

							<CustomButton backgroundColor="red" type="submit" width="25%" left="20rem">
								Delete
							</CustomButton>
						</Form>
					)}
				</Formik>
			</ModalPage>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		projectId: state.project.projectId,
		teamId: selectTeamId(state)
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
