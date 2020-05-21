import React from 'react';
import './create-task-form.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import Select from 'react-select';

//Use px for fixed size on focus, any other value format causes overflow on focus
const customStyles = {
	container: (provided, state) => ({
		width: '256px'
	}),

	menu: (provided, state) => ({
		position: 'relative',
		backgroundColor: 'white',
		width: '256px',
		minHeight: '50px',
		overflowY: 'auto',
		borderBottom: '1px dotted pink'
	})
};

interface Option {
	_id: string;
	summary: string;
}

interface ICreateTaskForm {
	column: string;
	handleSubmit(event: Event, column: string, newTask: string);
	options: Option[];
}

interface ICreateTaskFormState {
	newTask: string;
}

class CreateTaskForm extends React.Component<ICreateTaskForm, ICreateTaskFormState> {
	constructor(props) {
		super(props);
		this.state = {
			newTask: ''
		};
	}

	handleChange = (value) => {
		this.setState({ ...this.state, newTask: value });
	};

	render() {
		let { column, handleSubmit, options } = this.props;
		options =
			Array.isArray(options) && options.length > 0
				? options.map((issue) => ({ value: issue.summary, label: issue.summary, id: issue._id }))
				: [];
		return (
			<form
				style={{
					display: 'flex',
					flexDirection: 'row',
					position: 'relative',
					left: '.45rem',
					marginBottom: '8rem'
				}}
				onSubmit={(e) => handleSubmit(e, column, this.state.newTask)}
			>
				<Select
					value={this.state.newTask}
					onChange={this.handleChange}
					options={options}
					styles={customStyles}
					autosize={false}
				/>
				<CustomButton type="submit" width="100%" marginLeft=".2rem" top=".05rem">
					<i className="fas fa-plus" style={{ position: 'relative', bottom: '.02rem', fontSize: '.8rem' }} />
				</CustomButton>
			</form>
		);
	}
}

export default CreateTaskForm;
