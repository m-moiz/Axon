import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SignLink from '../../components/sign-link/sign-link.component';
import axios from 'axios';
import { setUserId, signIn } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

class SignInPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			message: '',
			updatedMessage: false
		};
	}

	//explain this???
	handleClick = () => {
		if (this.state.message !== '') {
			this.setState({ updateMessage: true });
			setTimeout(() => {
				this.setState({ updateMessage: false });
			}, 200);
		}
	};

	componentDidMount() {
		this.props.checkAuthAndGoToHomepage();
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:4001/api/user', {
				username: this.state.username,
				password: this.state.password
			})
			.then((response) => {
				if (response.data.success === 'true') {
					this.saveAuthTokenInSession(response.data.token);
					this.props.signIn();
					this.props.setUserId(response.data.userId);
					window.location = `/projects`;
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
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ marginTop: '2.6rem', marginBottom: '2.6rem' }}
				>
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
							<Card.Title>Sign In</Card.Title>
						</Card.Body>
						<form
							onSubmit={this.handleSubmit}
							style={{ paddingTop: '3rem', paddingLeft: '6rem', paddingBottom: '3.4rem' }}
						>
							<div style={{ marginBottom: '2.3rem' }}>
								<FormInput
									handleChange={this.handleChange}
									name="username"
									type="username"
									placeholder="Enter Username"
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
									name="password"
									type="password"
									placeholder="Enter Password"
								/>
							</div>

							<CustomButton type="submit" width="70%">
								Sign In
							</CustomButton>
						</form>
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
		signIn: () => dispatch(signIn())
	};
};

export default connect(null, mapDispatchToProps)(SignInPage);
