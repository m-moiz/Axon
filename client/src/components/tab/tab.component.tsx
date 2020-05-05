import React from 'react';
import { connect } from 'react-redux';
import { getRandomColor } from '../../utils/utils';
import { setTeamId } from '../../store/team/team.actions';
import './tab.styles.scss';

interface ITab {
	title: string;
	id: string;
	setTeamId: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Tab({ title, id, setTeamId }: ITab) {
	let backgroundColor = getRandomColor();
	return (
		<div className="tab" style={{ backgroundColor: backgroundColor }} onClick={() => setTeamId(id)}>
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
