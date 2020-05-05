import React from 'react';
import './options-box-header.styles.scss';

interface IOptionsBoxHeader {
	title: string;
}
function OptionsBoxHeader({ title }: IOptionsBoxHeader) {
	return (
		<header className="optionsBoxHeader">
			<span className="optionsBoxHeader-title">{title}</span>
		</header>
	);
}

export default OptionsBoxHeader;
