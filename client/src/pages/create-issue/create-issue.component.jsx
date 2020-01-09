import React, { Component } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import DatePicker from 'react-datepicker';
import ModalPage from '../../components/modal-page/modal-page.component';
import { connect } from 'react-redux';
import { toggleCreateIssueModal } from '../../redux/issue/issue.actions';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import FroalaEditor from 'react-froala-wysiwyg';
import 'react-datepicker/dist/react-datepicker.css';
import './create-issue.styles.scss';
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

class CreateIssue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			issueType: 'Improvement',
			reporter: '',
			summary: '',
			priority: 'High',
			startDate: new Date(),
			enivironment: '',
			status: 'Open',
			version: '',
			description: ''
		};
	}

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

	handleModelChange = (description) => {
		this.setState({
			description: description
		});
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
				height="80%"
				width="70%"
			>
				<FormInput name="issueType" handleChange={this.handleChange} inputName="Issue Type" as="select">
					<option>Improvement</option>
					<option>Bug</option>
					<option>Feature</option>
					<option>Task</option>
					<option>Epic</option>
				</FormInput>
				<FormInput
					name="reporter"
					inputName="Reporter"
					handleChange={this.handleChange}
					type="text"
					placeholder="Reporter name"
				/>
				<FormInput name="status" handleChange={this.handleChange} inputName="Status" as="select">
					<option>Open</option>
					<option>Closed</option>
				</FormInput>
				<FormInput
					name="summary"
					inputName="Summary"
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
						placeholder: 'Start typing...',
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
				<FormInput
					inputName="Version"
					name="version"
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
