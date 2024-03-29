import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import MySelect from '../../components/my-select/my-select.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { setTeamId, setTeamArray, setTeamUsers } from '../../store/team/team.actions';
import { withRouter } from 'react-router-dom';
import './find-team.styles.scss';
import axios from 'axios';

class FindTeam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: []
		};
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: `api/teams`,
			headers: {
				Authorization: window.sessionStorage.getItem('token')
			}
		})
			.then((resp) => {
				this.setState((prevState) => {
					let teams = [ ...prevState.teams, resp.data.teams ];
					return {
						...prevState,
						teams
					};
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<ModalPage style="full">
				<Formik
					initialValues={{ teams: '' }}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						this.props.setTeamId(values.teams.id);
						this.props.setTeamUsers(values.teams.users);
						setSubmitting(false);
						this.props.history.push('/empty');
						this.props.history.replace('/projects');
					}}
				>
					{({ values, errors, handleSubmit, touched, setFieldValue, setFieldTouched, isSubmitting }) => (
						<form
							onSubmit={handleSubmit}
							style={{ paddingLeft: '1.7rem', paddingTop: '2.5rem', marginBottom: '1rem' }}
						>
							<div className="form-head">
								<h3 className="modal-page-title">Find a team to join</h3>
							</div>

							<MySelect
								label="Select a team"
								name="teams"
								value={values.teams}
								onChange={setFieldValue}
								onBlur={setFieldTouched}
								error={errors.teams}
								touched={touched.teams}
								options={this.state.teams[0]}
								width="50%"
							/>

							<div className="button-layout">
								<CustomButton
									type="submit"
									isSubmitting={isSubmitting}
									width="20%"
									top="20%"
									left="25rem"
								>
									Find
								</CustomButton>
							</div>
						</form>
					)}
				</Formik>
			</ModalPage>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTeamId: (teamId) => dispatch(setTeamId(teamId)),
		setTeamArray: (array) => dispatch(setTeamArray(array)),
		setTeamUsers: (users) => dispatch(setTeamUsers(users))
	};
};

const mapStateToProps = (state) => {
	return {
		username: state.user.username,
		userId: state.user.userId
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindTeam));
