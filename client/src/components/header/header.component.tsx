import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import PropTypes from 'prop-types';
import Notification from '../notification/notification.component';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { signOut, toggleAppTheme } from '../../store/user/user.actions';
import { withRouter } from 'react-router-dom';
import { selectIsUserSignedIn } from '../../store/user/user.selectors';
const logo = require('./PixelArt.png');
import './header.styles.scss';

interface IHeader {
	isSignedIn: boolean;
	signOut: (text: string) => void;
	toggleAppTheme: () => void;
	isDarkTheme?: boolean;
}

const Header = ({ isSignedIn, signOut, toggleAppTheme, isDarkTheme }: IHeader) => (
	<div className="header">
		<Navbar
			collapseOnSelect
			bg={isDarkTheme ? 'dark' : 'light'}
			variant={isDarkTheme ? 'dark' : 'light'}
			expand="lg"
		>
			<Navbar.Brand href="#home">
				<img alt="axon logo" src={logo} width="30" height="30" className="d-inline-block align-top" /> Axon
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					{isSignedIn ? (
						<React.Fragment>
							<LinkContainer to="/projects">
								<Nav.Link active={false}>Projects</Nav.Link>
							</LinkContainer>
						</React.Fragment>
					) : (
						''
					)}
				</Nav>
				{isSignedIn ? (
					<BootstrapSwitchButton
						checked={true}
						size="xs"
						style="switch-style"
						onlabel="Dark"
						offlabel="Light"
						onstyle="primary"
						offstyle="success"
						onChange={toggleAppTheme}
					/>
				) : (
					''
				)}
				{isSignedIn ? <Notification /> : ''}
				<Form inline>
					{isSignedIn ? (
						<React.Fragment>
							<LinkContainer to="/sign-in">
								<Nav.Link
									className="link-button"
									onClick={() => signOut(window.sessionStorage.getItem('token'))}
								>
									Sign Out
								</Nav.Link>
							</LinkContainer>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div className="nav-links">
								<LinkContainer to="/sign-in">
									<Nav.Link className="link-button">Sign In</Nav.Link>
								</LinkContainer>

								<LinkContainer to="/sign-up">
									<Nav.Link className="link-button">Sign Up</Nav.Link>
								</LinkContainer>
							</div>
						</React.Fragment>
					)}
				</Form>
			</Navbar.Collapse>
		</Navbar>
	</div>
);

const mapStateToProps = (state) => {
	return {
		isSignedIn: selectIsUserSignedIn(state),
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: (token) => dispatch(signOut(token)),
		toggleAppTheme: () => dispatch(toggleAppTheme())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
