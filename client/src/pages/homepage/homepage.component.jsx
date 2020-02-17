import React, { Component } from 'react';
import CreateTeam from '../create-team/create-team.component';
import FindTeam from '../find-team/find-team.component';
import ProjectsPage from '../projects/projects.component';
import { signOut } from '../../redux/user/user.actions';
import { selectTeamId } from '../../redux/team/team.selectors';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Hompepage extends Component {
	componentDidMount() {
		if (this.props.isSignedIn === false || !window.sessionStorage.getItem('token')) {
			this.props.signOut();
			this.props.history.push('/sign-in');
		}
	}

	render() {
		let component;

		if (this.props.isAdmin && !this.props.teamId) {
			component = <CreateTeam />;
		} else if (!this.props.isAdmin && !this.props.teamId) {
			component = <FindTeam />;
		} else if (this.props.teamId) {
			component = <ProjectsPage />;
		}

		return <React.Fragment>{component}</React.Fragment>;
	}
}

const mapStateToProps = (state) => {
	return {
		isAdmin: state.user.isAdmin,
		teamId: selectTeamId(state),
		isSignedIn: state.user.isSignedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hompepage));
