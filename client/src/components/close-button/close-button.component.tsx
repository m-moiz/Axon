import React from 'react';
import './close-button.styles.scss';

interface CloseButton {
	action: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	top?: string;
	left?: string;
	bottom?: string;
	fontSize?: string;
	hoverBackground?: string;
	color?: string;
}

const CloseButton = ({ action, top, left, bottom, fontSize, hoverBackground, color }: CloseButton) => (
	<div
		className="close_button"
		style={{
			top: top,
			left: left,
			bottom: bottom,
			fontSize: fontSize,
			color: color
		}}
		onClick={action}
	>
		<i className="fas fa-times" />
	</div>
);

export default CloseButton;
