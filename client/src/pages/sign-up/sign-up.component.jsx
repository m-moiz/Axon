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
			message: '',
			updateMessage: false
		};
	}

	componentDidMount() {
		this.props.checkAuthAndGoToHomepage();
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};

	handleClick = () => {
		if (this.state.message !== '') {
			this.setState({ updateMessage: true });
			setTimeout(() => {
				this.setState({ updateMessage: false });
			}, 200);
		}
	};

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
					this.props.history(`/user/issues`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleChange = (e) => {
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
								<FormInput
									handleChange={this.handleChange}
									name="email"
									type="email"
									placeholder="Enter Email"
								/>
								{this.state.message !== '' ? (
									<p className={this.state.updateMessage ? 'form_wrong update' : 'form_wrong'}>
										{this.state.message}
									</p>
								) : (
									''
								)}
								<FormInput
									handleChange={this.handleChange}
									name="username"
									type="username"
									placeholder="Enter Username"
								/>
								<FormInput
									handleChange={this.handleChange}
									name="password"
									type="password"
									placeholder="Enter Password"
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
