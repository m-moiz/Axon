import React from 'react';
import PropTypes from 'prop-types';
import PriorityIcon from '../priority-icon/priority-icon.component';
import './details-box.styles.scss';

function DetailsBox({ type, label, priority, environment, resolution }) {
	return (
		<div className="details-box">
			<span>Type: {type}</span>

			<span>Label: {label}</span>

			<span>
				Priority: <PriorityIcon priority={priority} />
			</span>

			<span>Environment: {environment}</span>

			<span>Resolution</span>
		</div>
	);
}

DetailsBox.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	priority: PropTypes.string,
	environment: PropTypes.string,
	resolution: PropTypes.string
};

export default DetailsBox;
