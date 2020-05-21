import React from 'react';
import Select from 'react-select';

interface IMySelect {
	name: string;
	options: string;
	width: string;
	label: string;
	styles: string;
	error: string;
	touched: boolean;
	isMulti: boolean;
	onChange: (name: string, value: string) => void;
	onBlur: (name: string, value: Boolean) => void;
	value: string;
	placeholder: string;
}

class MySelect extends React.Component<IMySelect> {
	handleChange = (value) => {
		this.props.onChange(this.props.name, value);
	};

	handleBlur = () => {
		this.props.onBlur(this.props.name, true);
	};

	render() {
		return (
			<div style={{ margin: '1rem 0', width: this.props.width }}>
				<label htmlFor="members">{this.props.label}</label>
				<Select
					name="usernames"
					options={this.props.options}
					isMulti={this.props.isMulti}
					isSearchable={true}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					value={this.props.value}
					styles={this.props.styles}
					placeholder={this.props.placeholder}
				/>
				{!!this.props.error &&
				this.props.touched && <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>}
			</div>
		);
	}
}

export default MySelect;
