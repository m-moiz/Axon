import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import FormInput from '../../components/form-input/form-input.component';
import { Formik, Field } from 'formik';
import CustomButton from '../../components/custom-button/custom-button.component';
import SignLink from '../../components/sign-link/sign-link.component';
import axios from 'axios';
import { setTeamId, setTeamArray } from '../../redux/team/team.actions';
import { setUserId, setUsername, setIsAdmin, signIn } from '../../redux/user/user.actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

class SignInPage extends Component {
	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};

	render() {
		return (
			<div>
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ marginTop: '2.6rem', marginBottom: '2.6rem' }}
				>
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
							<Card.Title>Sign In</Card.Title>
						</Card.Body>
						<Formik
							initialValues={{ username: 'user2', password: 'Truthordare-123@' }}
							validate={(values) => {
								const errors = {};
								if (!values.username) {
									errors.username = 'Required field';
								}
								if (!values.password) {
									errors.password = 'Required field';
								}

								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setSubmitting(true);
								axios({
									method: 'post',
									url: `/api/user/`,
									headers: {
										'Content-Type': 'application/json'
									},
									data: {
										username: values.username,
										password: values.password
									}
								})
									.then((response) => {
										if (response.data.success === 'true') {
											this.saveAuthTokenInSession(response.data.token);
											this.props.signIn();
											if (response.data.teams.length > 0) {
												this.props.setTeamId(response.data.teams[0].teamId);
											}
											this.props.setTeamArray(response.data.teams);
											this.props.setIsAdmin(response.data.isTeamAdmin);
											this.props.setUserId(response.data.userId);
											this.props.setUsername(response.data.username);
											this.props.history.push(`/`);
											setSubmitting(false);
										}
									})
									.catch((error) => {
										console.log(error);
									});
							}}
						>
							{({ handleSubmit, isSubmitting, errors, touched }) => (
								<form
									onSubmit={handleSubmit}
									className="sign-form"
									style={{ paddingTop: '3rem', paddingLeft: '6rem', paddingBottom: '3.4rem' }}
								>
									<div style={{ marginBottom: '2.3rem' }}>
										<Field
											name="username"
											type="username"
											placeholder="Enter Username"
											as={FormInput}
											bottomStyle
											error={errors.username}
											touched={touched.username}
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

									<CustomButton type="submit" disabled={isSubmitting} isSign>
										Sign In
									</CustomButton>
								</form>
							)}
						</Formik>
					</Card>
				</div>

				<SignLink text="Don't have an account. Sign up" link="here" linkTo="/sign-up" />
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

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));
