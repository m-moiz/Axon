import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './create-issue.styles.scss';

class CreateIssue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: '',
			issueType: '',
			summary: '',
			description: '',
			priority: '',
			startDate: new Date()
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleDateChange = (date) => {
		this.setState({
			startDate: date
		});
	};

	render() {
		return (
			<div className="create-issue">
				<Form>
					<Container>
						<FormInput
							name="project"
							handleChange={this.handleChange}
							inputName="Project"
							type="text"
							placeholder="Enter Project"
						/>
						<FormInput name="issueType" handleChange={this.handleChange} inputName="Issue Type" as="select">
							<option>Improvement</option>
							<option>Bug</option>
							<option>Feature</option>
							<option>Task</option>
							<option>Epic</option>
						</FormInput>
						<FormInput
							name="summary"
							handleChange={this.handleChange}
							inputName="Summary"
							type="text"
							placeholder="Enter Summary"
						/>
						<FormInput
							name="description"
							handleChange={this.handleChange}
							inputName="Description"
							as="textarea"
							rows="6"
						/>
						<FormInput name="priority" handleChange={this.handleChange} inputName="Priority" as="select">
							<option>High</option>
							<option>Medium</option>
							<option>Low</option>
							<option>Lowest</option>
						</FormInput>
						<DatePicker
							className="date-picker"
							selected={this.state.startDate}
							onChange={this.handleDateChange}
						/>
						<CustomButton>Create</CustomButton>
					</Container>
				</Form>
			</div>
		);
	}
}

export default CreateIssue;
