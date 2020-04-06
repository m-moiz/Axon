import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class MySelect extends React.Component {
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

MySelect.propTypes = {
	name: PropTypes.string,
	options: PropTypes.array,
	isMulti: PropTypes.bool,
	handleChagne: PropTypes.func,
	handleBlur: PropTypes.func,
	value: PropTypes.string,
	placeholder: PropTypes.string
};

export default MySelect;
