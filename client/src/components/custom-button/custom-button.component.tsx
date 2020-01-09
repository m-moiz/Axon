import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
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

CustomButton.propTypes = {
	width: PropTypes.string,
	left: PropTypes.string,
	right: PropTypes.string,
	bottom: PropTypes.string,
	top: PropTypes.string,
	color: PropTypes.string,
	children: PropTypes.node,
	type: PropTypes.string,
	handleClick: PropTypes.func
};

export default CustomButton;
