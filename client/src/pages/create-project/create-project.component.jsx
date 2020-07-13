import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import { selectTeamId } from '../../store/team/team.selectors';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { toggleCreateProjectModal } from '../../store/project/project.actions';
import { closingMessageAfterOpening, setMessageText } from '../../store/message/message.actions';
import { addRoles } from '../../store/user/user.actions';
import { withRouter } from 'react-router-dom';
import CreateProjectForm from './create-project-form';
import axios from 'axios';
import { schema } from './create-project-form-validator';
import './create-project.styles.scss';

class CreateProject extends Component {
	render() {
		return (
			<ModalPage typeOfPage="create">
				<Formik
					initialValues={{ name: '', description: '' }}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios({
							method: 'post',
							url: `/api/project/${this.props.teamId}&${this.props.userId}/create`,
							headers: {
								'Content-Type': 'application/json',
								Authorization: window.sessionStorage.getItem('token')
							},
							data: {
								projectName: values.name,
								projectDesc: values.description
							}
						})
							.then((resp) => {
								if (resp.data.message === 'Successfully created project') {
									this.props.toggleCreateProjectModal();
									if (Array.isArray(resp.data.roles)) {
										resp.data.roles.forEach((role) => {
											this.props.addRoles(role);
										});
									}
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
					{({ ...props }) => (
						<CreateProjectForm {...props} toggleCreateProjectModal={this.props.toggleCreateProjectModal} />
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
		addRoles: (roles) => dispatch(addRoles(roles)),
		setMessageText: (message) => dispatch(setMessageText(message))
	};
};

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		teamId: selectTeamId(state),
		username: state.user.username
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProject));
