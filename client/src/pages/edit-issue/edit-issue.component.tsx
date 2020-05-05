import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import IssueForm from '../../components/issue-form/issue-form.component';
import { selectTeamId } from '../../store/team/team.selectors';
import { Formik } from 'formik';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { connect } from 'react-redux';
import { toggleEditIssueModal } from '../../store/issue/issue.actions';
import { selectCurrentIssue } from '../../store/issue/issue.selectors';
import { closingMessageAfterOpening, setMessageText } from '../../store/message/message.actions.js';
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

interface EditIssue {
	currentIssue: [];
	isEditIssueModalOpen: boolean;
	username: string;
	teamId: string;
	issueId: string;
	projectId: string;
	toggleEditIssueModal: () => void;
	setMessageText: (text: string) => void;
	closingMessageAfterOpening: () => void;
	history: History;
}

class EditIssue extends Component<EditIssue> {
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
			assignee,
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
						<ModalPage newStyle={props} style="full" typeOfPage="edit">
							<Formik
								initialValues={{
									username: this.props.username,
									issueType: issueType,
									reporter: reporter,
									assignee: assignee,
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
											assignee: values.assignee,
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
								{({ values, errors, handleSubmit, touched, setFieldValue, setFieldTouched }) => (
									<IssueForm
										type="edit"
										values={values}
										errors={errors}
										handleSubmit={handleSubmit}
										touched={touched}
										setFieldValue={setFieldValue}
										setFieldTouched={setFieldTouched}
										modalAction={toggleEditIssueModal}
									/>
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
