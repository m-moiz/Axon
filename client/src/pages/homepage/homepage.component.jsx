import React, { Component } from 'react';
import axios from 'axios';
import CreateTeam from '../create-team/create-team.component';
import FindTeam from '../find-team/find-team.component';
import ProjectsPage from '../projects/projects.component';
import { selectTeamId } from '../../redux/team/team.selectors';
import { connect } from 'react-redux';

class Hompepage extends Component {
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
		teamId: selectTeamId(state)
	};
};

export default connect(mapStateToProps)(Hompepage);
