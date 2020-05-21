import React, { Component } from 'react';
import * as H from 'history';
import ModalPage from '../../components/modal-page/modal-page.component';
import ModalFooter from '../../components/modal-footer/modal-footer.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import { selectTeamId } from '../../store/team/team.selectors';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { toggleDeleteProjectModal } from '../../store/project/project.actions';
import { withRouter } from 'react-router-dom';
import { closingMessageAfterOpening, setMessageText } from '../../store/message/message.actions';
import axios from 'axios';
import './delete-project.styles.scss';

interface IDeleteProject {
	teamId: string;
	projectId: string;
	toggleDeleteProjectModal(): void;
	closingMessageAfterOpening(): void;
	setMessageText(message: string): void;
	history: H.History;
}

const DeleteProject = ({
	teamId,
	projectId,
	toggleDeleteProjectModal,
	closingMessageAfterOpening,
	setMessageText,
	history
}: IDeleteProject) => {
	return (
		<ModalPage style="small">
			<Formik
				initialValues={{}}
				onSubmit={() => {
					axios({
						method: 'delete',
						url: `/api/project/${teamId}&${projectId}/delete`,
						headers: {
							Authorization: window.sessionStorage.getItem('token')
						}
					}).then((res) => {
						if (res.data.message === 'Successfully deleted project') {
							toggleDeleteProjectModal();
							setMessageText('Deleted project successfully');
							closingMessageAfterOpening();
							history.push('/empty');
							history.replace('/projects');
						}
					});
				}}
			>
				{({ handleSubmit }) => (
					<Form
						onSubmit={handleSubmit}
						style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
					>
						<CloseButton
							fontSize="1.4rem"
							bottom=".5rem"
							color="grey"
							action={this.props.toggleDeleteProjectModal}
						/>
						<div className="form-head">
							<h3 className="modal-page-title">Delete Project</h3>
						</div>

						<ModalFooter>
							<CustomButton isSecondary width="100%" handleClick={this.props.toggleDeleteProjectModal}>
								Cancel
							</CustomButton>

							<CustomButton type="submit" width="100%" danger>
								Delete
							</CustomButton>
						</ModalFooter>
					</Form>
				)}
			</Formik>
		</ModalPage>
	);
};

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
