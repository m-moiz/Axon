import React, { Component } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import ModalPage from '../../components/modal-page/modal-page.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import { selectTeamId } from '../../redux/team/team.selectors';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { toggleCreateProjectModal } from '../../redux/project/project.actions';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import './create-project.styles.scss';

const schema = (teamId) =>
	yup.object().shape({
		name: yup.string().test('checkDuplicate', 'Project name already exists', function(value) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: `/api/project/${teamId}`,
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						projectName: value
					}
				})
					.then((resp) => {
						console.log(resp);
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

class CreateProject extends Component {
	render() {
		return (
			<ModalPage>
				<Formik
					initialValues={{ name: '', description: '' }}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios({
							method: 'post',
							url: `/api/project/${this.props.teamId}/create`,
							headers: {
								'Content-Type': 'application/json'
							},
							data: {
								projectName: values.name,
								projectDesc: values.description
							}
						})
							.then((resp) => {
								if (resp.data.message === 'Successfully created project') {
									this.props.toggleCreateProjectModal();
									this.props.setMessageText('Project created successfully');
									this.props.closingMessageAfterOpening();
									this.props.history.push('/empty');
									setSubmitting(false);
									this.props.history.replace('/projects');
								}
							})
							.catch((err) => console.log(err));
					}}
				>
					{({ errors, handleSubmit, touched }) => (
						<Form
							onSubmit={handleSubmit}
							style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
						>
							<div className="form-head">
								<h3 className="modal-page-title">Create Project</h3>
								<CloseButton
									fontSize="1rem"
									left="60%"
									color="grey"
									hoverBackground="black"
									action={this.props.toggleCreateProjectModal}
								/>
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

							<CustomButton type="submit" width="25%" left="20rem" top="7.5rem">
								Create
							</CustomButton>
						</Form>
					)}
				</Formik>
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleCreateProjectModal: () => dispatch(toggleCreateProjectModal()),
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening()),
		setMessageText: (message) => dispatch(setMessageText(message))
	};
};

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		teamId: selectTeamId(state)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProject));
