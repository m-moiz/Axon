import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { toggleCreateIssue } from '../../redux/issue/issue.actions';
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

	handleSubmit(e) {
		e.preventDefault();
		fetch(`/api/issue/${this.props.userId}&${this.props.projectId}/createIssue`, {
			projectName: this.state.project,
			issueType: this.state.issueType,
			summary: this.state.summary,
			description: this.state.description,
			priority: this.state.priority,
			dueDate: this.state.startDate
		})
			.then((resp) => resp.json())
			.then((data) => {
				if (data.message === 'Success') {
					window.location = '/user/issues';
				}
			})
			.catch((err) => console.log(err));
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
				<Form
					onSubmit={this.handleSubmit}
					className={this.props.toggleModal ? 'create-issue-modal open' : 'create-issue-modal close'}
				>
					<Container>
						<h3 className="create-issue-title">New Issue</h3>
						<div className="modal_close" onClick={this.props.toggleCreateIssue}>
							&times;
						</div>
						<FormInput
							name="project"
							handleChange={this.handleChange}
							type="text"
							placeholder="Enter Project Name"
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
						<div className="due-date">
							<label>Due Date</label>
							<DatePicker
								className="date-picker"
								selected={this.state.startDate}
								onChange={this.handleDateChange}
							/>
						</div>

						<CustomButton width="25%" left="28rem">
							Create
						</CustomButton>
					</Container>
				</Form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleCreateIssue: () => dispatch(toggleCreateIssue())
	};
};

const mapStateToProps = (state) => {
	return {
		toggleModal: state.issue.toggleCreateIssue,
		userId: state.user.userId,
		projectId: state.user.projectId
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateIssue);
