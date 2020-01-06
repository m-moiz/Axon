import React from 'react';
import './options-box-header.styles.scss';

function OptionsBoxHeader({ title }) {
	return (
		<header className="optionsBoxHeader">
			<span className="optionsBoxHeader-title">{title}</span>
		</header>
	);
}

export default OptionsBoxHeader;
