import React from 'react';
import './sign-link.styles.scss';
import { Link } from 'react-router-dom';

const SignLink = ({ text, link, linkTo }) => (
	<div className="sign-link">
		<p>{text}</p>
		<Link to={linkTo}>{link}</Link>
	</div>
);

export default SignLink;
