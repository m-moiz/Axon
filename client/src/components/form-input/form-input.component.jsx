import React from 'react';
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
	rows,
	children,
	isFieldValid
}) => (
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
					className={`form-input ${as === 'select' ? 'dropdown' : 'original'} ${isFieldValid
						? ''
						: 'invalid'}`}
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

export default FormInput;
