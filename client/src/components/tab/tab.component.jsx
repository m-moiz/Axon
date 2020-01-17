import React from 'react';
import { connect } from 'react-redux';
import { setTeamId } from '../../redux/team/team.actions';
import './tab.styles.scss';

function Tab({ title, id, setTeamId }) {
	return (
		<div className="tab" onClick={() => setTeamId(id)}>
			<span>{title}</span>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setTeamId: (id) => dispatch(setTeamId(id))
	};
};

export default connect(null, mapDispatchToProps)(Tab);
