import React, { Component } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import DatePicker from 'react-datepicker';
import ModalPage from '../../components/modal-page/modal-page.component';
import { connect } from 'react-redux';
import { toggleEditIssueModal } from '../../redux/issue/issue.actions';
import { selectCurrentIssue } from '../../redux/issue/issue.selectors';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import FroalaEditor from 'react-froala-wysiwyg';
// Require Editor JS files.
import '../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js';
import '../../../node_modules/froala-editor/js/plugins.pkgd.min.js';
import '../../../node_modules/froala-editor/js/third_party/embedly.min.js';
// import "froala-editor/js/plugins/fullscreen.min.js"

// Require Editor CSS files.
import '../../../node_modules/froala-editor/css/froala_style.min.css';
import '../../../node_modules/froala-editor/css/froala_editor.pkgd.min.css';
import '../../../node_modules/froala-editor/css/third_party/embedly.min.css';
// import "froala-editor/css/plugins/fullscreen.min.css";
import './edit-issue.styles.scss';

class EditIssue extends Component {
	constructor(props) {
		super(props);
		const {
			issueType,
			reporter,
			summary,
			description,
			priorityType,
			dueDate,
			environment,
			status,
			version
		} = this.props.currentIssue;
		this.state = {
			issueType: `${issueType}`,
			reporter: `${reporter}`,
			summary: `${summary}`,
			description: `${description}`,
			priority: `${priorityType}`,
			updateDate: new Date(),
			enivironment: `${environment}`,
			status: `${status}`,
			dueDate: `${dueDate}`,
			version: `${version}`
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		axios({
			method: 'post',
			url: `/api/issue/${this.props.userId}&${this.props.projectId}&${this.props.issueId}/update`,
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
				this.props.toggleEditIssueModal();
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
		const {
			issueType,
			reporter,
			summary,
			description,
			priorityType,
			dueDate,
			environment,
			status,
			version
		} = this.props.currentIssue;
		return (
			<ModalPage
				typeOfPage="create"
				handleSubmit={this.handleSubmit}
				title="Edit Issue"
				toggleModal={this.props.toggleEditIssueModal}
				height="80%"
				width="70%"
			>
				<FormInput
					name="issueType"
					value={issueType}
					handleChange={this.handleChange}
					inputName="Issue Type"
					as="select"
				>
					<option>Improvement</option>
					<option>Bug</option>
					<option>Feature</option>
					<option>Task</option>
					<option>Epic</option>
				</FormInput>
				<FormInput
					name="reporter"
					value={reporter}
					inputName="reporter"
					handleChange={this.handleChange}
					type="text"
					placeholder="Reporter name"
				/>
				<FormInput value={status} name="status" handleChange={this.handleChange} inputName="Status" as="select">
					<option>Open</option>
					<option>Closed</option>
				</FormInput>
				<FormInput
					value={summary}
					name="summary"
					inputName="summary"
					handleChange={this.handleChange}
					type="text"
					placeholder="Enter Summary"
				/>
				<label>Description</label>

				<FroalaEditor
					model={this.state.description}
					onModelChange={this.handleModelChange}
					config={{
						attribution: false,
						placeholder: description,
						toolbarButtons: {
							moreText: {
								buttons: [
									'bold',
									'italic',
									'underline',
									'strikeThrough',
									'subscript',
									'superscript',
									'fontFamily',
									'fontSize',
									'textColor',
									'backgroundColor',
									'inlineClass',
									'inlineStyle',
									'clearFormatting'
								]
							},
							moreParagraph: {
								buttons: [
									'alignLeft',
									'alignCenter',
									'formatOLSimple',
									'alignRight',
									'alignJustify',
									'formatOL',
									'formatUL',
									'paragraphFormat',
									'paragraphStyle',
									'lineHeight',
									'outdent',
									'indent',
									'quote'
								]
							},
							moreRich: {
								buttons: [
									'insertLink',
									'insertImage',
									'insertVideo',
									'insertTable',
									'emoticons',
									'fontAwesome',
									'specialCharacters',
									'embedly',
									'insertFile',
									'insertHR'
								]
							},
							moreMisc: {
								buttons: [
									'undo',
									'redo',
									'fullscreen',
									'print',
									'getPDF',
									'spellChecker',
									'selectAll',
									'html',
									'help'
								],
								align: 'right',
								buttonsVisible: 2
							}
						},
						pluginsEnabled: [
							'spell',
							'quote',
							'save',
							'paragraphFormat',
							'paragraphStyle',
							'help',
							'draggable',
							'align',
							'link',
							'lists',
							'file',
							'image',
							'emoticons',
							'url',
							'video',
							'embedly',
							'colors',
							'entities',
							'inlineClass',
							'inlineStyle',
							'codeBeautif ',
							// 'spellChecker',
							'imageTUI'
						]
					}}
				/>

				<FormInput
					value={priorityType}
					name="priority"
					handleChange={this.handleChange}
					inputName="Priority"
					as="select"
				>
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
					value={environment}
					handleChange={this.handleChange}
					inputName="Environment"
					as="textarea"
					rows="3"
				/>
				<FormInput
					name="version"
					value={version}
					handleChange={this.handleChange}
					type="text"
					placeholder="Enter version"
				/>
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleEditIssueModal: () => dispatch(toggleEditIssueModal()),
		setMessageText: (message) => dispatch(setMessageText(message)),
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening())
	};
};

const mapStateToProps = (state) => {
	return {
		isEditIssueModalOpen: state.issue.isEditIssueModalOpen,
		userId: state.user.userId,
		projectId: state.project.projectId,
		issueId: state.issue.issueId,
		issue: selectCurrentIssue(state)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditIssue));
