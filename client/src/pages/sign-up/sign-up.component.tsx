import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SignLink from '../../components/sign-link/sign-link.component';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './sign-up.styles.scss';

class SignUpPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: '',
			areFieldsValid: false,
			isFieldValid: {
				isUsernameValid: false,
				isEmailValid: false,
				isPasswordValid: false
			},
			validityErrors: {
				usernameValidityError: '',
				passwordValidityError: '',
				emailValidityError: ''
			}
		};
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};

	handleClick = () => {};

	handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:4001/api/user/create', {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			})
			.then((response) => {
				console.log(response);
				if (response.data.erorr === 'User already exists') {
					this.setState({ message: response.data.message });
				}
				if (response.data.success === 'true') {
					this.saveAuthTokenInSession(response.data.token);
					this.props.history.push(`/user/issues`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleChange = (e) => {
		//TODO: Form Validation
		let email = this.state.email;
		let password = this.state.password;
		let username = this.state.username;
		let isUsernameValid = false;
		let isEmailValid = false;
		let isPasswordValid = false;
		let usernameValidityError = '';
		let passwordValidityError = '';
		let emailValidityError = '';

		if (email === '') {
			isEmailValid = false;
		}

		if (password === '') {
			isPasswordValid = false;
		} else if (password) {
			if (password.length < 10) {
				passwordValidityError = 'Password must at least be 10 characters';
			}

			if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#(){}[\]])[A-Za-z\d@$!%*?&#(){}[\]]+/)) {
				passwordValidityError = 'Password must contain at least 1 capital letter, 1 symbol and 1 digit';
			}

			if (
				password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#(){}[\]])[A-Za-z\d@$!%*?&#(){}[\]]{10,}/)
			) {
				passwordValidityError = '';
				isPasswordValid = true;
			}
		}

		if (username === '') {
			isUsernameValid = false;
		} else if (username) {
			if (username.length >= 4) {
				isUsernameValid = true;
			}
		}

		if (email) {
			if (
				!email.match(
					/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
				)
			) {
				emailValidityError = 'Not a valid email address';
			} else {
				isEmailValid = true;
			}
		}

		let isFieldValid = {
			isUsernameValid,
			isEmailValid,
			isPasswordValid
		};

		let validityErrors = {
			usernameValidityError,
			emailValidityError,
			passwordValidityError
		};

		if (isEmailValid && isPasswordValid && isUsernameValid) {
			this.setState({ areFieldsValid: true });
		}

		this.setState((state) => ({
			isFieldValid: isFieldValid
		}));

		this.setState((state) => ({
			...state,
			validityErrors: validityErrors
		}));

		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div>
				<div className="d-flex justify-content-center align-items-center" style={{ marginTop: '2.6rem' }}>
					<Card style={{ width: '32rem', boxShadow: '1px 1px 10px 2px rgb(217, 214, 208)' }}>
						<Card.Body
							style={{
								backgroundColor: 'rgb(44,44,44)',
								color: 'white',
								height: '4.4rem',
								paddingLeft: '13rem',
								letterSpacing: '.1rem',
								display: 'flex'
							}}
						>
							<Card.Title>Sign Up</Card.Title>
						</Card.Body>
						<form
							onSubmit={this.handleSubmit}
							style={{ paddingTop: '3rem', paddingLeft: '6rem', paddingBottom: '3.4rem' }}
						>
							<div style={{ marginBottom: '2.3rem' }}>
								{this.state.validityErrors.emaildValidityError !== '' ? (
									<p>{this.state.validityErrors.emailValidityError}</p>
								) : (
									''
								)}
								<FormInput
									handleChange={this.handleChange}
									name="email"
									type="email"
									placeholder="Enter Email"
									isFieldValid={this.state.isFieldValid.isEmailValid}
									bottomStyle
								/>
								{this.state.validityErrors.usernameValidityError !== '' ? (
									<p>{this.state.validityErrors.usernameValidityError}</p>
								) : (
									''
								)}
								<FormInput
									handleChange={this.handleChange}
									name="username"
									type="username"
									placeholder="Enter Username"
									isFieldValid={this.state.isFieldValid.isUsernameValid}
									bottomStyle
								/>
								{this.state.validityErrors.passwordValidityError !== '' ? (
									<p>{this.state.validityErrors.passwordValidityError}</p>
								) : (
									''
								)}
								<FormInput
									handleChange={this.handleChange}
									name="password"
									type="password"
									placeholder="Enter Password"
									isFieldValid={this.state.isFieldValid.isPasswordValid}
									bottomStyle
								/>
							</div>

							<CustomButton type="submit" handleClick={this.handleClick} width="70%">
								Sign Up
							</CustomButton>
						</form>
					</Card>
				</div>
				<SignLink text="Already have an account. Sign in" link="here" linkTo="/sign-in" />
			</div>
		);
	}
}

export default withRouter(SignUpPage);
