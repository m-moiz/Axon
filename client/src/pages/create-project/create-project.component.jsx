import React, { Component } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import ModalPage from '../../components/modal-page/modal-page.component';
import { connect } from 'react-redux';
import { toggleCreateProjectModal } from '../../redux/project/project.actions';
import { closingMessageAfterOpening, setMessageText } from '../../redux/message/message.actions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './create-project.styles.scss';

class CreateProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			showMessage: false
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		axios({
			method: 'post',
			url: `/api/project/${this.props.userId}/create`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				projectName: this.state.name,
				projectDesc: this.state.description
			}
		})
			.then((resp) => {
				this.props.toggleCreateProjectModal();
				this.props.setMessageText('Project created successfully');
				this.props.closingMessageAfterOpening();
				this.props.history.push('/empty');
				this.props.history.replace('/projects');
			})
			.catch((err) => console.log(err));
	};

	handleBlur = (e) => {
		if (e.target.name === 'name') {
			axios({
				method: 'post',
				url: `/api/project/${this.props.userId}`,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					projectName: this.state.name
				}
			})
				.then((resp) => {})
				.catch((err) => {
					this.setState({ showMessage: false });
					console.log(err);
				});
		}
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<ModalPage
				typeOfPage="create"
				handleSubmit={this.handleSubmit}
				title="New Project"
				toggleModal={this.props.toggleCreateProjectModal}
				closeButtonFontSize="1.4rem"
				closeButtonBottom=".5rem"
			>
				{this.state.showMessage ? <span>Name already exists</span> : ''}
				<FormInput
					name="name"
					handleBlur={this.handleBlur}
					handleChange={this.handleChange}
					type="text"
					placeholder="Enter Project Name"
				/>
				<FormInput name="description" handleChange={this.handleChange} placeholder="Enter a brief summary" />
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleCreateProjectModal: () => dispatch(toggleCreateProjectModal()),
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening()),
		setMessageText: (message) => dispatch(setMessageText(message))
	};
};

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProject));
