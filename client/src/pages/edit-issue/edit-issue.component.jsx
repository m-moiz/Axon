import React, { Component } from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';
import ModalPage from '../../components/modal-page/modal-page.component';
import CloseButton from '../../components/close-button/close-button.component';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import FormInput from '../../components/form-input/form-input.component';
import { issueTypes, statusTypes, priorityTypes } from '../../types/types';
import { selectTeamId } from '../../redux/team/team.selectors';
import { Formik, Field } from 'formik';
import RichEditor from '../../components/editor/editor.component';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { connect } from 'react-redux';
import { toggleEditIssueModal } from '../../redux/issue/issue.actions';
import { selectCurrentIssue } from '../../redux/issue/issue.selectors';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions.js';
import { withRouter } from 'react-router-dom';
import { Transition } from 'react-spring/renderprops';
import * as yup from 'yup';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './edit-issue.styles.scss';

const schema = yup.object().shape({
	issueType: yup.string(),
	reporter: yup.string().nullable(),
	summary: yup.string(),
	priority: yup.string().nullable(),
	startDate: yup.string(),
	environment: yup.string(),
	status: yup.string(),
	version: yup.string().matches(/^[\d\.]+$/, 'Not a valid version number'),
	description: yup.string()
});

class EditIssue extends Component {
	componentDidMount() {
		console.log(this.props.currentIssue[0]);
	}
	render() {
		let currentIssueArray = Object.entries(this.props.currentIssue[0]);

		for (let [ key, value ] of currentIssueArray) {
			if (!value) {
				value = '';
			}
		}

		let currentIssue = Object.fromEntries(currentIssueArray);

		let {
			issueType,
			reporter,
			dueDate,
			summary,
			description,
			priorityType,
			environment,
			status,
			version
		} = currentIssue;

		return (
			<Transition
				items={this.props.isEditIssueModalOpen}
				from={{ transform: 'translateY(800px)' }}
				enter={{ transform: 'translateY(0)' }}
				leave={{ transform: 'translateY(800px)' }}
				config={{
					mass: 1.6,
					tension: 202,
					friction: 32
				}}
			>
				{(show) =>
					show &&
					((props) => (
						<ModalPage newStyle={props} style="full">
							<Formik
								initialValues={{
									username: this.props.username,
									issueType: issueType,
									reporter: reporter,
									summary: summary,
									priorityType: priorityType,
									startDate: Date.parse(dueDate),
									environment: environment,
									status: status,
									version: version,
									//Have to parse because description is stored as string in db.
									editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
								}}
								onSubmit={(values, { setSubmitting }) => {
									setSubmitting(true);
									const convertedData = JSON.stringify(
										convertToRaw(values.editorState.getCurrentContent())
									);
									axios({
										method: 'put',
										url: `/api/issue/${this.props.teamId}&${this.props.projectId}&${this.props
											.issueId}/update`,
										headers: {
											'Content-Type': 'application/json',
											Authorization: window.sessionStorage.getItem('token')
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
											this.props.toggleEditIssueModal();
											this.props.setMessageText('Issue edited successfully');
											this.props.closingMessageAfterOpening();
											this.props.history.push('/empty');
											this.props.history.replace('/user/issues');
										})
										.catch((err) => console.log(err));
								}}
							>
								{({ values, errors, handleSubmit, touched, setFieldValue }) => (
									<Form
										onSubmit={handleSubmit}
										style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
									>
										<div className="form-head">
											<h3 className="modal-page-title">Edit Issue</h3>
											<CloseButton
												fontSize="1.3rem"
												left="70%"
												color="grey"
												hoverBackground="#6b6b6b"
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

										<RichEditor editorState={values.editorState} onChange={setFieldValue} />

										<Field
											inputName="Priority"
											name="priorityType"
											as={FormInput}
											isSelectInput
											error={errors.priorityType}
											touched={touched.priorityType}
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

										<CustomButton
											type="submit"
											width="25%"
											left="20rem"
											marginBottom="4rem"
											top="2rem"
										>
											Edit
										</CustomButton>
									</Form>
								)}
							</Formik>
						</ModalPage>
					))}
			</Transition>
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
		teamId: selectTeamId(state),
		username: state.user.username
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditIssue));
