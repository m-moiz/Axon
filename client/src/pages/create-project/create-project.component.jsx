import React, { Component } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import ModalPage from '../../components/modal-page/modal-page.component';
import { connect } from 'react-redux';
import { toggleCreateProject } from '../../redux/project/project.actions';
import axios from 'axios';
import './create-project.styles.scss';

class CreateProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: ''
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
				this.props.toggleCreateProject();
				window.location.reload();
			})
			.catch((err) => console.log(err));
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
				toggleModal={this.props.toggleCreateProject}
			>
				<FormInput name="name" handleChange={this.handleChange} type="text" placeholder="Enter Project Name" />
				<FormInput name="description" handleChange={this.handleChange} placeholder="Enter a brief summary" />
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleCreateProject: () => dispatch(toggleCreateProject())
	};
};

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
