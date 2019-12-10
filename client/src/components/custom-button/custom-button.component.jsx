import React from 'react';
import Button from 'react-bootstrap/Button';
import './custom-button.styles.scss';

const CustomButton = ({ width, left, right, color, children, type, handleClick }) => (
	<div className="custom-button">
		<Button
			type={type}
			onClick={handleClick}
			style={{ position: 'relative', width: width, left: left, right: right, backgroundColor: color }}
		>
			{children}
		</Button>
	</div>
);

export default CustomButton;
