import React from 'react';
import './close-button.styles.scss';

const CloseButton = ({ action, top, left, fontSize }) => (
	<div className="close_button" style={{ top: top, left: left, fontSize: fontSize }} onClick={action}>
		<i className="fas fa-times" />
	</div>
);

export default CloseButton;
