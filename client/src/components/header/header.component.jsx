import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ProfileIcon from '../profile-icon/profile-icon.component';
import './header.styles.scss';

function Header() {
	return (
		<div className="header">
			<Navbar bg="dark" variant="dark" expand="lg" style={{ height: '4rem' }}>
				<Navbar.Brand href="#home">Axon</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#link">Projects</Nav.Link>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<ProfileIcon firstLetterOfName={'M'} />
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default Header;
