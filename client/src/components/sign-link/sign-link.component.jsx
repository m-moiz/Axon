import React from 'react';
import './sign-link.styles.scss';

const SignLink = ({ text, link, linkTo }) => (
	<div className="sign-link">
		<p>{text}</p>
		<a href={linkTo} className="link-to">
			{link}
		</a>
	</div>
);

export default SignLink;
