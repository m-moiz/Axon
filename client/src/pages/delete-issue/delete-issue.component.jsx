import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import ModalFooter from '../../components/modal-footer/modal-footer.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import { selectTeamId } from '../../store/team/team.selectors';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { toggleDeleteIssueModal } from '../../store/issue/issue.actions';
import { withRouter } from 'react-router-dom';
import { closingMessageAfterOpening, setMessageText } from '../../store/message/message.actions';
import axios from 'axios';
import './delete-issue.styles.scss';

class DeleteIssue extends Component {
	render() {
		return (
			<ModalPage style="small" typeOfPage="delete">
				<Formik
					initialValues={{}}
					onSubmit={() => {
						axios({
							method: 'delete',
							url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${this.props.issueId}&
							${this.props.issueId}/delete`,
							headers: {
								Authorization: window.sessionStorage.getItem('token')
							}
						}).then((res) => {
							this.props.toggleDeleteIssueModal();
							this.props.setMessageText('Deleted issue successfully');
							this.props.closingMessageAfterOpening();
							this.props.history.push('/empty');
							this.props.history.replace('/project/issues');
						});
					}}
				>
					{({ handleSubmit }) => (
						<Form
							onSubmit={handleSubmit}
							style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
						>
							<div className="form-head">
								<h3 className="modal-page-title">Delete Issue</h3>
								<CloseButton
									fontSize="1.4rem"
									left="56%"
									bottom=".5rem"
									color="grey"
									action={this.props.toggleDeleteIssueModal}
								/>
							</div>

							<ModalFooter>
								<CustomButton isSecondary width="100%" handleClick={this.props.toggleDeleteIssueModal}>
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
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		projectId: state.project.projectId,
		issueId: state.issue.issueId,
		teamId: selectTeamId(state)
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
