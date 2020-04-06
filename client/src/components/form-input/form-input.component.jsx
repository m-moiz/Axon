import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import './form-input.styles.scss';

const FormInput = ({
	small,
	error,
	touched,
	value,
	onChange,
	onBlur,
	inputName,
	name,
	type,
	placeholder,
	as,
	bottomStyle,
	rows,
	isSelectInput,
	children
}) => {
	var className = 'form-input';
	if (isSelectInput) {
		className += ' dropdown';
	} else if (!as && !bottomStyle) {
		className += ' border';
	}

	if (small) {
		className += ' small';
	} else {
		className += ' large';
	}

	if (error) {
		className += ' invalid';
	}

	return (
		<div>
			{inputName ? (
				<div className="form-label">
					<label>{inputName}</label>
				</div>
			) : (
				''
			)}
			<div className="input-container">
				{isSelectInput ? (
					<Form.Control
						className={className}
						name={name}
						value={value}
						onChange={onChange}
						as="select"
						placeholder={placeholder}
					>
						{children}
					</Form.Control>
				) : (
					<input
						className={className}
						name={name}
						value={value}
						onBlur={onBlur}
						onChange={onChange}
						type={type}
						as={as}
						placeholder={placeholder}
						rows={rows}
					/>
				)}

				{error && touched && <div style={{ color: 'red', marginTop: '.2rem' }}>{error}</div>}
			</div>
		</div>
	);
};

FormInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	inputName: PropTypes.string,
	name: PropTypes.string.isRequired,
	text: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	as: PropTypes.string,
	rows: PropTypes.string,
	children: PropTypes.elementType,
	isFieldValid: PropTypes.bool,
	bottomStyle: PropTypes.bool
};

export default FormInput;
