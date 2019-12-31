import React from 'react';
import Button from 'react-bootstrap/Button';
import './custom-button.styles.scss';

const CustomButton = ({ width, left, right, bottom, top, color, children, type, handleClick }) => (
	<div className="custom-button">
		<Button
			type={type}
			onClick={handleClick}
			style={{
				position: 'relative',
				width: width,
				left: left,
				right: right,
				bottom: bottom,
				top: top,
				backgroundColor: color
			}}
		>
			{children}
		</Button>
	</div>
);

export default CustomButton;
