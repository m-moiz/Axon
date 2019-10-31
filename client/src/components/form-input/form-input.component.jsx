import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './form-input.styles.scss';

const FormInput = ({ handleChange, inputName, name, type, placeholder, as, rows, children }) => (
	<Form.Group>
		<Row>
			<Col>
				<div className="form-label">
					<Form.Label>{inputName}</Form.Label>
				</div>
			</Col>
		</Row>
		<Row>
			<Col>
				<Form.Control
					name={name}
					onChange={handleChange}
					size="md"
					className={as === 'select' ? 'form-input dropdown' : 'form-input original'}
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
