import React from 'react';
import './sign-link.styles.scss';
import { Link } from 'react-router-dom';

interface ISignLink {
	text: string;
	link: string;
	linkTo: string;
}

const SignLink = ({ text, link, linkTo }: ISignLink) => (
	<div className="sign-link">
		<p style={{ marginRight: '.3rem' }}>{text}</p>
		<Link to={linkTo}>{link}</Link>
	</div>
);

export default SignLink;
