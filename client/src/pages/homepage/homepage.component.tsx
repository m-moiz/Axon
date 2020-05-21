import React, { useEffect } from 'react';
import { History } from 'history';
import CreateTeam from '../create-team/create-team.component';
import FindTeam from '../find-team/find-team.component';
import ProjectsPage from '../projects/projects.component';
import { signOut } from '../../store/user/user.actions';
import { selectTeamId } from '../../store/team/team.selectors';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

interface IHomepage {
	isSignedIn: boolean;
	signOut(token: string): void;
	history: History;
}

const Homepage = ({ isSignedIn, signOut, history }: IHomepage) => {
	useEffect(() => {
		if (isSignedIn === false || !window.sessionStorage.getItem('token')) {
			signOut(window.sessionStorage.getItem('token'));
			history.push('/sign-in');
		}
	}, []);

	let component;

	if (this.props.isAdmin && !this.props.teamId) {
		component = <CreateTeam />;
	} else if (!this.props.isAdmin && !this.props.teamId) {
		component = <FindTeam />;
	} else if (this.props.teamId) {
		component = <ProjectsPage />;
	}

	return <React.Fragment>{component}</React.Fragment>;
};

const mapStateToProps = (state) => {
	return {
		isAdmin: state.user.isAdmin,
		teamId: selectTeamId(state),
		isSignedIn: state.user.isSignedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: (token) => dispatch(signOut(token))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage));
