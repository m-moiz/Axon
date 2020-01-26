import React from 'react';
import PropTypes from 'prop-types';
import './close-button.styles.scss';

const CloseButton = ({ action, top, left, bottom, fontSize, hoverBackground, color }) => (
	<div
		className="close_button"
		style={{
			top: top,
			left: left,
			bottom: bottom,
			fontSize: fontSize,
			color: color,
			'&:hover': {
				background: hoverBackground
			}
		}}
		onClick={action}
	>
		<i className="fas fa-times" />
	</div>
);

CloseButton.propTypes = {
	action: PropTypes.func,
	top: PropTypes.string,
	left: PropTypes.string,
	bottom: PropTypes.string,
	fontSize: PropTypes.string,
	color: PropTypes.string,
	hoverBackground: PropTypes.string
};

export default CloseButton;
