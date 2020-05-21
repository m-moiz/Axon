import React, { Component } from 'react';
import { History } from 'history';
import ModalPage from '../../components/modal-page/modal-page.component';
import MySelect from '../../components/my-select/my-select.component';
import FormInput from '../../components/form-input/form-input.component';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { closingMessageAfterOpening, setMessageText } from '../../store/message/message.actions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
	name: yup
		.string()
		.test('checkDuplicate', 'Team name already exists', function(value) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: `/api/team/find`,
					headers: {
						'Content-Type': 'application/json',
						Authorization: window.sessionStorage.getItem('token')
					},
					data: {
						name: value
					}
				})
					.then((resp) => {
						if (resp.data.message === 'Team name already exists') {
							resolve(false);
						}

						if (resp.data.message === 'Team not found') {
							resolve(true);
						}

						resolve(true);
					})
					.catch(() => resolve(true));
			});
		})
		.required('Required')
});

interface IEditTeamProps {
	username: string;
	setTeamId(teamId: string): void;
	setMessageText(message: string): void;
	closingMessageAfterOpening(): void;
	history: History;
}

interface IEditTeamState {
	users: IUser[];
}

class EditTeam extends Component<IEditTeamProps, IEditTeamState> {
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
			<ModalPage>
				<Formik
					initialValues={{ name: '', usernames: '' }}
					validationSchema={schema}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios({
							method: 'put',
							url: `/api/team/create`,
							headers: {
								'Content-Type': 'application/json',
								Authorization: window.sessionStorage.getItem('token')
							},
							data: {
								name: values.name,
								username: this.props.username,
								usernames: values.usernames
							}
						})
							.then((resp) => {
								this.props.setMessageText('Team created successfully');
								this.props.closingMessageAfterOpening();
								setSubmitting(false);
								this.props.history.push('/empty');
								this.props.history.replace('/projects');
							})
							.catch((err) => console.log(err));
					}}
				>
					{({ values, errors, handleSubmit, touched, setFieldValue, setFieldTouched, isSubmitting }) => (
						<form
							onSubmit={handleSubmit}
							style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
						>
							<div className="form-head">
								<h3 className="modal-page-title">Create Team</h3>
							</div>

							<Field
								name="name"
								placeholder="Enter Team Name"
								as={FormInput}
								bottomStyle
								error={errors.name}
								touched={touched.name}
							/>

							<MySelect
								label="Select team members"
								name="usernames"
								value={values.usernames}
								onChange={setFieldValue}
								onBlur={setFieldTouched}
								error={errors.usernames}
								touched={touched.usernames}
								options={this.state.users[0]}
								width="50%"
							/>
						</form>
					)}
				</Formik>
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening()),
		setMessageText: (message) => dispatch(setMessageText(message))
	};
};

const mapStateToProps = (state) => {
	return {
		username: state.user.username
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTeam));
