import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './form-input.styles.scss';

const FormInput = ({
	handleChange,
	handleBlur,
	inputName,
	name,
	type,
	placeholder,
	as,
	bottomStyle,
	rows,
	children,
	isFieldValid = true
}) => {
	var className = 'form-input';
	if (as === 'select') {
		className += ' dropdown';
	} else if (!as && bottomStyle) {
		className += ' original';
	} else if (!as && !bottomStyle) {
		className += ' border';
	} else if (!isFieldValid) {
		className += ' invalid';
	}

	return (
		<Form.Group>
			<Row>
				<Col>
					{inputName ? (
						<div className="form-label">
							<Form.Label>{inputName}</Form.Label>
						</div>
					) : (
						''
					)}
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Control
						name={name}
						onBlur={handleBlur}
						onChange={handleChange}
						size="md"
						className={className}
						type={type}
						as={as}
						placeholder={placeholder}
						rows={rows}
					>
						{children}
					</Form.Control>
				</Col>
			</Row>
		</Form.Group>
	);
};

FormInput.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func,
	inputName: PropTypes.string,
	name: PropTypes.string.isRequired,
	text: PropTypes.string,
	placeholder: PropTypes.string,
	as: PropTypes.string,
	rows: PropTypes.string,
	children: PropTypes.elementType,
	isFieldValid: PropTypes.bool,
	bottomStyle: PropTypes.bool
};

export default FormInput;
