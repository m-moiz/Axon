import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ProfileIcon from '../profile-icon/profile-icon.component';
import { connect } from 'react-redux';
import { signOut } from '../../redux/user/user.actions';
import logo from './PixelArt.png';
import './header.styles.scss';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		if (this.props.isSignedIn === false) {
			window.location = '/sign-in';
		}
	}

	render() {
		return (
			<div className="header">
				<Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
					<Navbar.Brand href="#home">
						<img
							alt="axon logo"
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{' '}
						Axon
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/">Home</Nav.Link>
							<Nav.Link href="/projects">Projects</Nav.Link>
						</Nav>
						<Form inline>
							{this.props.isSignedIn ? (
								<Nav.Link className="link-button" onClick={this.props.signOut} href="/sign-in">
									Sign Out
								</Nav.Link>
							) : (
								<React.Fragment>
									<div className="nav-links">
										<Nav.Link className="link-button" href="/sign-in">
											Sign In
										</Nav.Link>
										<Nav.Link className="link-button" href="/sign-up">
											Sign Up
										</Nav.Link>
									</div>
								</React.Fragment>
							)}
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.user.isSignedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
