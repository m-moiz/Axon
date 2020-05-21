import React from 'react';
import Form from 'react-bootstrap/Form';
import './form-input.styles.scss';

interface IFormInput {
	small: string;
	error: string;
	touched: string;
	onChange: () => (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => (event: React.FocusEvent<HTMLInputElement>) => void;
	inputName?: string;
	name: string;
	text: string;
	value: string;
	placeholder: string;
	type: string;
	children: React.ReactNode;
	isFieldValid?: boolean;
	bottomStyle?: boolean;
	isSelectInput?: boolean;
}

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
	bottomStyle,
	isSelectInput,
	children
}: IFormInput) => {
	var className = 'form-input';

	if (isSelectInput) {
		className += ' dropdown';
	} else if (!bottomStyle) {
		className += ' border';
	}

	className += small ? 'small' : 'large';

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
						placeholder={placeholder}
					/>
				)}

				{error && touched && <div style={{ color: 'red', marginTop: '.2rem' }}>{error}</div>}
			</div>
		</div>
	);
};

export default FormInput;
