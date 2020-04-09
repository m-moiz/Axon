import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SignLink from '../../components/sign-link/sign-link.component';
import { Formik, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import { setTeamId, setTeamArray } from '../../store/team/team.actions';
import { setUserId, setUsername, signIn, setIsAdmin } from '../../store/user/user.actions';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';

import './sign-up.styles.scss';

const schema = Yup.object().shape({
	email: Yup.string()
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Not a valid email')
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	username: Yup.string()
		.test('checkDuplicate', 'Username already exists', function(value) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: '/api/user/findUser',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						username: value
					}
				})
					.then((resp) => {
						console.log(resp);
						if (resp.data.message === 'User already exists') {
							resolve(false);
						}

						if (resp.data.message === 'User not found') {
							resolve(true);
						}

						resolve(true);
					})
					.catch(() => resolve(true));
			});
		})
		.min(3, 'Too Short!')
		.max(25, 'Too Long!')
		.required('Required'),
	password: Yup.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#(){}[\]])[A-Za-z\d@$!%*?&#(){}[\]]+/,
			'Password must contain at least 1 capital letter, 1 symbol and 1 digit'
		)
		.min(10, 'must be at least 10 characters long')
		.required('Required')
});

class SignUpPage extends Component {
	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};

	render() {
		return (
			<div>
				<div className="d-flex justify-content-center align-items-center" style={{ marginTop: '2.6rem' }}>
					<Card style={{ width: '32rem', boxShadow: '1px 1px 10px 2px rgb(39, 38, 38)', border: 'none' }}>
						<Card.Body
							style={{
								backgroundColor: 'rgb(44,44,44)',
								color: 'white',
								height: '4.4rem',
								justifyContent: 'center',
								letterSpacing: '.1rem',
								display: 'flex'
							}}
						>
							<Card.Title>Sign Up</Card.Title>
						</Card.Body>
						<Formik
							initialValues={{ email: '', username: '', password: '' }}
							validationSchema={schema}
							onSubmit={(values, { setSubmitting }) => {
								axios
									.post('/api/user/create', {
										email: values.email,
										username: values.username,
										password: values.password
									})
									.then((response) => {
										if (response.data.success === 'true') {
											this.saveAuthTokenInSession(response.data.token);
											if (response.data.teams.length > 0) {
												this.props.setTeamId(response.data.teams[0].teamId);
											}
											this.props.signIn();
											this.props.setTeamArray(response.data.teams);
											this.props.setUserId(response.data.userId);
											this.props.setUsername(response.data.username);
											this.props.setIsAdmin(response.data.isTeamAdmin);
											this.props.history.push(`/`);
										}
									})
									.catch((error) => {
										console.log(error);
									});
							}}
						>
							{({ errors, touched, handleSubmit, isSubmitting, submitForm }) => (
								<form
									onSubmit={handleSubmit}
									className="sign-form"
									style={{ paddingTop: '3rem', paddingLeft: '6rem', paddingBottom: '3.4rem' }}
								>
									<div style={{ marginBottom: '2.3rem' }}>
										<Field
											name="email"
											type="email"
											placeholder="Enter Email"
											as={FormInput}
											error={errors.email}
											touched={touched.email}
											bottomStyle
										/>

										<Field
											name="username"
											type="username"
											placeholder="Enter Username"
											as={FormInput}
											error={errors.username}
											touched={touched.username}
											bottomStyle
										/>

										<Field
											name="password"
											type="password"
											placeholder="Enter Password"
											as={FormInput}
											error={errors.password}
											touched={touched.password}
											bottomStyle
										/>
									</div>

									<CustomButton type="submit" isSubmitting={isSubmitting} isSign>
										Sign Up
									</CustomButton>
								</form>
							)}
						</Formik>
					</Card>
				</div>
				<SignLink text="Already have an account. Sign in" link="here" linkTo="/sign-in" />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUserId: (userId) => dispatch(setUserId(userId)),
		setUsername: (username) => dispatch(setUsername(username)),
		signIn: () => dispatch(signIn()),
		setTeamId: (id) => dispatch(setTeamId(id)),
		setIsAdmin: (isTeamAdmin) => dispatch(setIsAdmin(isTeamAdmin)),
		setTeamArray: (array) => dispatch(setTeamArray(array))
	};
};

export default withRouter(connect(null, mapDispatchToProps)(SignUpPage));
