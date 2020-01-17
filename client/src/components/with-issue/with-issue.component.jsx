import React from 'react';

const UpdatedComponent = (OriginalComponent) => {
	class NewComponent extends React.Component {
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
			return <OriginalComponent />;
		}
	}

	return NewComponent;
};

export default UpdatedComponent;
