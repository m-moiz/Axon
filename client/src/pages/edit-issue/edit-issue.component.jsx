import React, { Component } from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';
import ModalPage from '../../components/modal-page/modal-page.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import Editor from '../../components/editor/editor.component';
import DatePicker from 'react-datepicker';
import FormInput from '../../components/form-input/form-input.component';
import { issueTypes, statusTypes, priorityTypes } from '../../types/types';
import { selectTeamId } from '../../redux/team/team.selectors';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { toggleEditIssueModal } from '../../redux/issue/issue.actions';
import { selectCurrentIssue } from '../../redux/issue/issue.selectors';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions.js';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './edit-issue.styles.scss';

const schema = yup.object().shape({
	issueType: yup.string().required('Required'),
	reporter: yup.string(),
	summary: yup.string().required('Required'),
	priority: yup.string().required('Required'),
	startDate: yup.string(),
	enivironment: yup.string(),
	status: yup.string(),
	version: yup.string().matches(/^[\d\.]+$/, 'Not a valid version number'),
	description: yup.string()
});

class EditIssue extends Component {
	render() {
		const {
			issueType,
			reporter,
			summary,
			description,
			priorityType,
			environment,
			status,
			version
		} = this.props.currentIssue[0];

		return (
			<ModalPage style="large">
				<Formik
					initialValues={{
						issueType: issueType,
						reporter: reporter,
						summary: summary,
						priority: priorityType,
						startDate: new Date(),
						environment: environment,
						status: status,
						version: version,
						description: description
					}}
					validationSchema={schema}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios({
							method: 'put',
							url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${this.props.issueId}/update`,
							headers: {
								'Content-Type': 'application/json'
							},
							data: {
								createdBy: values.username,
								issueType: values.issueType,
								reporter: values.reporter,
								status: values.status,
								summary: values.summary,
								description: values.description,
								priority: values.priority,
								dueDate: values.startDate,
								environment: values.environment,
								version: values.version
							}
						})
							.then((resp) => {
								this.props.toggleCreateIssueModal();
								this.props.setMessageText('Issue edited successfully');
								this.props.closingMessageAfterOpening();
								this.props.history.push('/empty');
								this.props.history.replace('/user/issues');
							})
							.catch((err) => console.log(err));
					}}
				>
					{({ values, errors, handleSubmit, touched, setFieldValue, setFieldTouched }) => (
						<Form
							onSubmit={handleSubmit}
							style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
						>
							<div className="form-head">
								<h3 className="modal-page-title">Edit Issue</h3>
								<CloseButton
									fontSize="1rem"
									left="60%"
									color="grey"
									action={this.props.toggleEditIssueModal}
								/>
							</div>

							<Field
								inputName="Issue Type"
								name="issueType"
								as={FormInput}
								isSelectInput
								error={errors.issueType}
								touched={touched.issueType}
							>
								{issueTypes.map((item) => <option>{item}</option>)}
							</Field>

							<Field
								inputName="Reporter"
								name="reporter"
								as={FormInput}
								placeholder="Reporter name"
								bottomStyle
								error={errors.reporter}
								touched={touched.reporter}
							/>

							<Field
								inputName="Status"
								name="status"
								as={FormInput}
								isSelectInput
								error={errors.status}
								touched={touched.status}
							>
								{statusTypes.map((item) => <option>{item}</option>)}
							</Field>

							<Field
								inputName="Summary"
								name="summary"
								as={FormInput}
								placeholder="Enter summary"
								error={errors.summary}
								touched={touched.summary}
							/>

							<label>Description</label>

							<Editor description={values.description} handleModelChange={setFieldValue} />

							<Field
								inputName="Priority"
								name="priorityType"
								as={FormInput}
								isSelectInput
								error={errors.priority}
								touched={touched.priority}
							>
								{priorityTypes.map((item) => <option>{item}</option>)}
							</Field>

							<div className="due-date">
								<label>Due Date</label>
								<DatePicker
									selected={values.startDate}
									dateFormat="MMMM d, yyyy"
									name="startDate"
									onChange={(date) => setFieldValue('startDate', date)}
								/>
							</div>

							<Field
								inputName="Environment"
								name="environment"
								placeholder="Enter environment"
								bottomStyle
								as={FormInput}
								error={errors.enivironment}
								touched={touched.enivironment}
							/>

							<Field
								inputName="Version"
								name="version"
								placeholder="Enter version"
								bottomStyle
								as={FormInput}
								error={errors.version}
								touched={touched.version}
							/>

							<CustomButton type="submit" width="25%" left="20rem">
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
		toggleEditIssueModal: () => dispatch(toggleEditIssueModal()),
		setMessageText: (message) => dispatch(setMessageText(message)),
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening())
	};
};

const mapStateToProps = (state) => {
	return {
		isEditIssueModalOpen: state.issue.isEditIssueModalOpen,
		userId: state.user.userId,
		projectId: state.project.projectId,
		issueId: state.issue.issueId,
		currentIssue: selectCurrentIssue(state),
		teamId: selectTeamId(state)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditIssue));
