import React, { useState } from 'react';
import { connect } from 'react-redux';
import ModalPage from '../../components/modal-page/modal-page.component';
import { toggleCreateIssueModal } from '../../store/issue/issue.actions';
import { closingMessageAfterOpening, setMessageText } from '../../store/message/message.actions.js';
import { selectTeamId } from '../../store/team/team.selectors';
import { EditorState, convertToRaw } from 'draft-js';
import IssueForm from '../../components/issue-form/issue-form.component';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { Transition } from 'react-spring/renderprops';
import axios from 'axios';
import * as yup from 'yup';
import './create-issue.styles.scss';

const schema = yup.object().shape({
	issueType: yup.string().required('Required'),
	reporter: yup.string(),
	summary: yup.string().required('Required'),
	priorityType: yup.string().required('Required'),
	startDate: yup.string(),
	environment: yup.string(),
	status: yup.string(),
	version: yup.string().matches(/^[\d\.]+$/, 'Not a valid version number')
});

const CreateIssue = ({
	isCreateIssueModalOpen,
	username,
	projectId,
	teamId,
	toggleCreateIssueModal,
	setMessageText,
	closingMessageAfterOpening,
	history
}) => {
	const [ projectMembers, setProjectMembers ] = useState([]);

	return (
		<Transition
			items={isCreateIssueModalOpen}
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
					<ModalPage newStyle={props} typeOfPage="create" style="full">
						<Formik
							initialValues={{
								username: username,
								issueType: 'Improvement',
								reporter: '',
								assignee: '',
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
								//convert to string because storing and retrieving editor state as an object causes error when setting EditorState.createWithContent()
								const convertedData = JSON.stringify(
									convertToRaw(values.editorState.getCurrentContent())
								);
								setSubmitting(true);
								axios({
									method: 'post',
									url: `/api/issue/${teamId}&${projectId}/create`,
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
										toggleCreateIssueModal();
										setMessageText('Issue created successfully');
										closingMessageAfterOpening();
										history.push('/empty');
										history.replace('/user/issues');
									})
									.catch((err) => console.log(err));
							}}
						>
							{({ values, errors, handleSubmit, touched, setFieldValue, setFieldTouched }) => (
								<IssueForm
									type="create"
									modalAction={toggleCreateIssueModal}
									values={values}
									errors={errors}
									projectMembers={projectMembers}
									handleSubmit={handleSubmit}
									touched={touched}
									setFieldValue={setFieldValue}
									setFieldTouched={setFieldTouched}
								/>
							)}
						</Formik>
					</ModalPage>
				))}
		</Transition>
	);
};

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
		username: state.user.username,
		projectId: state.project.projectId,
		teamId: selectTeamId(state)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateIssue));
