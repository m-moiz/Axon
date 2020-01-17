import React from 'react';
import PropTypes from 'prop-types';
import './sign-link.styles.scss';
import { Link } from 'react-router-dom';

const SignLink = ({ text, link, linkTo }) => (
	<div className="sign-link">
		<p style={{ marginRight: '.3rem' }}>{text}</p>
		<Link to={linkTo}>{link}</Link>
	</div>
);

SignLink.propTypes = {
	text: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	linkTo: PropTypes.string.isRequired
};

export default SignLink;
