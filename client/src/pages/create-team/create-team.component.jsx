import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { setTeamId } from '../../store/team/team.actions';
import { closingMessageAfterOpening, setMessageText } from '../../store/message/message.actions';
import { addRoles } from '../../store/user/user.actions';
import { withRouter } from 'react-router-dom';
import { schema } from './create-team-validator';
import CreateTeamForm from './create-team-form';
import axios from 'axios';
import './create-team.styles.scss';

class CreateTeam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: '/api/users',
			headers: {
				Authorization: window.sessionStorage.getItem('token')
			}
		})
			.then((resp) => {
				this.setState((prevState) => {
					let users = [ ...prevState.users, resp.data.doc ];
					return {
						...prevState,
						users
					};
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<ModalPage width="100%" height="100%" typeOfPage="create">
				<Formik
					initialValues={{ name: '', usernames: '' }}
					validationSchema={schema}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios({
							method: 'post',
							url: `/api/team/create`,
							headers: {
								'Content-Type': 'application/json',
								Authorization: window.sessionStorage.getItem('token')
							},
							data: {
								name: values.name,
								username: this.props.username,
								usernames: values.usernames.value,
								userId: this.props.userId
							}
						})
							.then((resp) => {
								this.props.setTeamId(resp.data.doc._id);
								if (Array.isArray(resp.data.roles)) {
									resp.data.roles.forEach((role) => {
										this.props.addRoles(role);
									});
								}
								this.props.setMessageText('Team created successfully');
								this.props.closingMessageAfterOpening();
								setSubmitting(false);
								this.props.history.push('/empty');
								this.props.history.replace('/projects');
							})
							.catch((err) => console.log(err));
					}}
				>
					{({ ...props }) => <CreateTeamForm {...props} users={this.state.users[0]} />}
				</Formik>
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening()),
		setMessageText: (message) => dispatch(setMessageText(message)),
		addRoles: (roles) => dispatch(addRoles(roles)),
		setTeamId: (teamId) => dispatch(setTeamId(teamId))
	};
};

const mapStateToProps = (state) => {
	return {
		username: state.user.username,
		userId: state.user.userId
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTeam));
