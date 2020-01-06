import React, { Component } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import DatePicker from 'react-datepicker';
import ModalPage from '../../components/modal-page/modal-page.component';
import { connect } from 'react-redux';
import { toggleCreateIssueModal } from '../../redux/issue/issue.actions';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import RichTextEditor from 'react-rte';
import 'react-datepicker/dist/react-datepicker.css';
import './create-issue.styles.scss';

class CreateIssue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueType: 'Improvement',
			reporter: '',
			summary: '',
			description: '',
			priority: 'High',
			startDate: new Date(),
			enivironment: '',
			status: 'Open',
			version: '',
			value: RichTextEditor.createEmptyValue()
		};
	}

	onChange = (value) => {
		this.setState({ value });
		if (this.props.onChange) {
			// Send the changes up to the parent component as an HTML string.
			// This is here to demonstrate using `.toString()` but in a real app it
			// would be better to avoid generating a string on each change.
			this.props.onChange(value.toString('html'));
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		axios({
			method: 'post',
			url: `/api/issue/${this.props.userId}&${this.props.projectId}/create`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				issueType: this.state.issueType,
				reporter: this.state.reporter,
				status: this.state.status,
				summary: this.state.summary,
				description: this.state.description,
				priority: this.state.priority,
				dueDate: this.state.startDate,
				enivironment: this.state.environment,
				version: this.state.version
			}
		})
			.then((resp) => {
				this.props.toggleCreateIssueModal();
				this.props.setMessageText('Issue created successfully');
				this.props.closingMessageAfterOpening();
				this.props.history.push('/empty');
				this.props.history.replace('/user/issues');
			})
			.catch((err) => console.log(err));
	};

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
			<ModalPage
				typeOfPage="create"
				handleSubmit={this.handleSubmit}
				title="New Issue"
				toggleModal={this.props.toggleCreateIssueModal}
			>
				<FormInput name="issueType" handleChange={this.handleChange} inputName="Issue Type" as="select">
					<option>Improvement</option>
					<option>Bug</option>
					<option>Feature</option>
					<option>Task</option>
					<option>Epic</option>
				</FormInput>
				<FormInput name="reporter" handleChange={this.handleChange} type="text" placeholder="Reporter name" />
				<FormInput name="status" handleChange={this.handleChange} inputName="Status" as="select">
					<option>Open</option>
					<option>Closed</option>
				</FormInput>
				<FormInput name="summary" handleChange={this.handleChange} type="text" placeholder="Enter Summary" />
				<RichTextEditor value={this.state.value} onChange={this.onChange} />
				<FormInput name="priority" handleChange={this.handleChange} inputName="Priority" as="select">
					<option>High</option>
					<option>Medium</option>
					<option>Low</option>
					<option>Lowest</option>
				</FormInput>
				<div className="due-date">
					<label>Due Date</label>
					<DatePicker
						className="date-picker"
						selected={this.state.startDate}
						onChange={this.handleDateChange}
					/>
				</div>
				<FormInput
					name="enivironment"
					handleChange={this.handleChange}
					inputName="Environment"
					as="textarea"
					rows="3"
				/>
				<FormInput name="version" handleChange={this.handleChange} type="text" placeholder="Enter version" />
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleCreateIssueModal: () => dispatch(toggleCreateIssueModal()),
		setMessageText: (message) => dispatch(setMessageText(message)),
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening())
	};
};

const mapStateToProps = (state) => {
	return {
		isCreateIssueModalOpen: state.issue.isCreateIssueModalOpen,
		userId: state.user.userId,
		projectId: state.project.projectId
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateIssue));
