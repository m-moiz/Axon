import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './custom-button.styles.scss';

const CustomButton = ({
	marginTop,
	marginBottom,
	marginRight,
	width,
	left,
	right,
	bottom,
	top,
	backgroundColor,
	color,
	children,
	type,
	handleClick,
	isSubmitting
}) => (
	<div className="custom-button">
		<Button
			type={type}
			onClick={handleClick}
			disabled={isSubmitting}
			style={{
				position: 'relative',
				width: width,
				left: left,
				right: right,
				bottom: bottom,
				marginTop: marginTop,
				marginBottom: marginBottom,
				marginRight: marginRight,
				top: top,
				backgroundColor: backgroundColor,
				color: color,
				border: 'none'
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
	marginBottom: PropTypes.string,
	marginTop: PropTypes.string,
	marginRight: PropTypes.string,
	color: PropTypes.string,
	children: PropTypes.node,
	type: PropTypes.string,
	handleClick: PropTypes.func
};

export default CustomButton;
