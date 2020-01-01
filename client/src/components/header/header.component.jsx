import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { signOut } from '../../redux/user/user.actions';
import { withRouter } from 'react-router-dom';
import { selectIsUserSignedIn } from '../../redux/user/user.selectors';
import logo from './PixelArt.png';
import './header.styles.scss';

const Header = ({ isSignedIn, signOut }) => (
	<div className="header">
		<Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="#home">
				<img alt="axon logo" src={logo} width="30" height="30" className="d-inline-block align-top" /> Axon
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<LinkContainer to="/">
						<Nav.Link active={false}>Home</Nav.Link>
					</LinkContainer>
					{isSignedIn ? (
						<LinkContainer to="/projects">
							<Nav.Link active={false}>Projects</Nav.Link>
						</LinkContainer>
					) : (
						''
					)}
				</Nav>
				<Form inline>
					{isSignedIn ? (
						<LinkContainer to="/sign-in">
							<Nav.Link className="link-button" onClick={signOut}>
								Sign Out
							</Nav.Link>
						</LinkContainer>
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
		isSignedIn: selectIsUserSignedIn(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
