import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './custom-button.styles.scss';

const Button = styled.button`
	width: ${(props) => (props.width ? props.width : '70%')};
	left: ${(props) => (props.left ? props.left : '')};
	bottom: ${(props) => (props.bottom ? props.bottom : '')};
	top: ${(props) => (props.top ? props.top : '')};
	margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
	margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
	margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
	position: relative;
	border: none;
	background-color: ${(props) => (props.danger ? '#dc3545' : '#007bff')};
	padding-top: .4rem;
	padding-bottom: .4rem;
	padding-left: .4rem;
	padding-right: .4rem;
	color: white;
	border-radius: .3rem;

	${(props) => {
		if (props.isSecondary) {
			return `
			 background-color: white;
			 color: black;
			 border: 1px solid black;
		   `;
		}
	}} &:hover {
		box-shadow: 1px 1px 5px 1px rgb(56, 56, 56);
	}

	@media screen and (max-width: 684px) {
		left: ${(props) => (props.left ? '60%' : '')};
	}

	@media screen and (max-width: 586px) {
		width: ${(props) => (props.isSign ? '90%' : '')};
	}
`;

const CustomButton = ({
	children,
	type,
	handleClick,
	isSubmitting,
	width,
	left,
	id,
	bottom,
	top,
	marginRight,
	marginBottom,
	marginLeft,
	isSign,
	isSecondary,
	danger
}) => (
	<div className="custom-button">
		<Button
		    id={id}
			type={type}
			onClick={handleClick}
			disabled={isSubmitting}
			width={width}
			left={left}
			bottom={bottom}
			marginRight={marginRight}
			marginLeft={marginLeft}
			marginBottom={marginBottom}
			top={top}
			isSign={isSign}
			isSecondary={isSecondary}
			danger={danger}
		>
			{children}
		</Button>
	</div>
);

CustomButton.propTypes = {
	children: PropTypes.node,
	type: PropTypes.string,
	handleClick: PropTypes.func
};

export default CustomButton;
