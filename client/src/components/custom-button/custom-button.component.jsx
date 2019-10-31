import React from 'react';
import Button from 'react-bootstrap/Button';
import './custom-button.styles.scss';

const CustomButton = ({ children }) => (
	<div className="custom-button">
		<Button>{children}</Button>
	</div>
);

export default CustomButton;
