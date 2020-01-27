import React, { Component } from 'react';
import ModalPage from '../../components/modal-page/modal-page.component';
import MySelect from '../../components/my-select/my-select.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { setTeamId, setTeamArray } from '../../redux/team/team.actions';
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
		axios
			.get('/api/teams')
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
			<ModalPage width="100%" height="100%">
				<Formik
					initialValues={{ teams: '' }}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios({
							method: 'post',
							url: `/api/user/${this.props.userId}/addTeam`,
							headers: {
								'Content-Type': 'application/json'
							},
							data: {
								name: values.teams
							}
						})
							.then((resp) => {
								console.log(resp);
								this.props.setTeamId(resp.data._teamId);
								this.props.setTeamArray(resp.data.teams);
								setSubmitting(false);
								this.props.history.push('/empty');
								this.props.history.replace('/projects');
							})
							.catch((err) => console.log(err));
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
									Create
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
		setTeamArray: (array) => dispatch(setTeamArray(array))
	};
};

const mapStateToProps = (state) => {
	return {
		username: state.user.username,
		userId: state.user.userId
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindTeam));
