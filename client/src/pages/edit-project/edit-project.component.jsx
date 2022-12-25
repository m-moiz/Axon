import React, { Component } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import ModalPage from '../../components/modal-page/modal-page.component';
import ModalFooter from '../../components/modal-footer/modal-footer.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import { selectTeamId } from '../../store/team/team.selectors';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { toggleEditProjectModal } from '../../store/project/project.actions';
import { closingMessageAfterOpening, setMessageText } from '../../store/message/message.actions';
import { selectCurrentProject } from '../../store/project/project.selectors';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import './edit-project.styles.scss';

const schema = (teamId) =>
	yup.object().shape({
		name: yup.string().test('checkDuplicate', 'Project name already exists', function(value) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: `/api/project/${teamId}`,
					headers: {
						'Content-Type': 'application/json',
						Authorization: window.sessionStorage.getItem('token')
					},
					data: {
						projectName: value
					}
				})
					.then((resp) => {
						if (resp.data.message === 'Project already exists') {
							resolve(false);
						}

						if (resp.data.message === 'Project not found') {
							resolve(true);
						}

						resolve(true);
					})
					.catch((err) => {
						resolve(true);
					});
			});
		})
	});

class EditProject extends Component {
	render() {
		const { name, description } = this.props.currentProject[0];
		return (
			<ModalPage typeOfPage="edit">
				<Formik
					initialValues={{ name: name, description: description }}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios({
							method: 'put',
							url: `/api/project/${this.props.teamId}&${this.props.projectId}&
							${this.props.userId}/update`,
							headers: {
								'Content-Type': 'application/json',
								Authorization: window.sessionStorage.getItem('token')
							},
							data: {
								name: values.name,
								description: values.description
							}
						})
							.then((resp) => {
								this.props.toggleEditProjectModal();
								this.props.setMessageText('Project edited successfully');
								this.props.closingMessageAfterOpening();
								this.props.history.push('/empty');
								setSubmitting(false);
								this.props.history.replace('/projects');
							})
							.catch((err) => console.log(err));
					}}
				>
					{({ values, errors, handleSubmit, touched }) => (
						<Form
							onSubmit={handleSubmit}
							style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
						>
							<CloseButton
								fontSize="1.1rem"
								bottom=".5rem"
								color="grey"
								action={this.props.toggleEditProjectModal}
							/>
							<div className="form-head">
								<h3 className="modal-page-title">Edit Project</h3>
							</div>

							<Field
								name="name"
								placeholder="Enter Project Name"
								as={FormInput}
								error={errors.name}
								touched={touched.name}
								bottomStyle
							/>
							<Field
								name="description"
								placeholder="Enter a brief summary"
								as={FormInput}
								error={errors.description}
								touched={touched.description}
								bottomStyle
							/>

							<ModalFooter>
								<CustomButton isSecondary width="100%" handleClick={toggleEditProjectModal}>
									Cancel
								</CustomButton>

								<CustomButton type="submit" width="100%">
									Edit
								</CustomButton>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleEditProjectModal: () => dispatch(toggleEditProjectModal()),
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening()),
		setMessageText: (message) => dispatch(setMessageText(message))
	};
};

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		projectId: state.project.projectId,
		teamId: selectTeamId(state),
		currentProject: selectCurrentProject(state)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProject));
