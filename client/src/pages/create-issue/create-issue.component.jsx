import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalPage from '../../components/modal-page/modal-page.component';
import { toggleCreateIssueModal } from '../../redux/issue/issue.actions';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions.js';
import { selectTeamId } from '../../redux/team/team.selectors';
import CustomButton from '../../components/custom-button/custom-button.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import FormInput from '../../components/form-input/form-input.component';
import RichEditor from '../../components/editor/editor.component';
import { EditorState, convertToRaw } from 'draft-js';
import { issueTypes, statusTypes, priorityTypes } from '../../types/types';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Formik, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import './create-issue.styles.scss';

const schema = yup.object().shape({
	issueType: yup.string().required('Required'),
	reporter: yup.string(),
	summary: yup.string().required('Required'),
	priorityType: yup.string().required('Required'),
	startDate: yup.string(),
	enivironment: yup.string(),
	status: yup.string(),
	version: yup.string().matches(/^[\d\.]+$/, 'Not a valid version number')
});

class CreateIssue extends Component {
	render() {
		return (
			<ModalPage typeOfPage="create" style="large">
				<Formik
					initialValues={{
						username: this.props.username,
						issueType: 'Improvement',
						reporter: '',
						summary: '',
						priorityType: 'High',
						startDate: new Date(),
						environment: '',
						status: 'Open',
						version: '',
						editorState: EditorState.createEmpty()
					}}
					validationSchema={schema}
					onSubmit={(values, { setSubmitting }) => {
						const convertedData = convertToRaw(values.editorState.getCurrentContent());
						setSubmitting(true);
						axios({
							method: 'post',
							url: `/api/issue/${this.props.teamId}&${this.props.projectId}/create`,
							headers: {
								'Content-Type': 'application/json'
							},
							data: {
								createdBy: values.username,
								issueType: values.issueType,
								reporter: values.reporter,
								status: values.status,
								summary: values.summary,
								description: convertedData,
								priorityType: values.priorityType,
								dueDate: values.startDate,
								environment: values.environment,
								version: values.version
							}
						})
							.then((resp) => {
								this.props.toggleCreateIssueModal();
								this.props.setMessageText('Issue created successfully');
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
								<h3 className="modal-page-title">Create Issue</h3>
								<CloseButton
									fontSize="1rem"
									left="60%"
									color="grey"
									action={this.props.toggleCreateIssueModal}
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
								{issueTypes.map((item, index) => <option key={index}>{item}</option>)}
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
								{statusTypes.map((item, index) => <option key={index}>{item}</option>)}
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

							<RichEditor editorState={values.editorState} onChange={setFieldValue} />

							<Field
								inputName="Priority"
								name="priorityType"
								as={FormInput}
								isSelectInput
								error={errors.priorityType}
								touched={touched.priorityType}
							>
								{priorityTypes.map((item, index) => <option key={index}>{item}</option>)}
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

							<CustomButton
								type="submit"
								type="submit"
								width="25%"
								left="20rem"
								marginBottom="4rem"
								top="2rem"
							>
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
		toggleCreateIssueModal: () => dispatch(toggleCreateIssueModal()),
		setMessageText: (message) => dispatch(setMessageText(message)),
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening())
	};
};

const mapStateToProps = (state) => {
	return {
		isCreateIssueModalOpen: state.issue.isCreateIssueModalOpen,
		userId: state.user.userId,
		username: state.user.username,
		projectId: state.project.projectId,
		teamId: selectTeamId(state)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateIssue));
