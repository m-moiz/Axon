import React from 'react';
import PropTypes from 'prop-types';
import './priority-icon.styles.scss';

function PriorityIcon({ priority }) {
	let className = 'priority-icon ';
	if (priority === 'High') {
		className += 'red';
	} else if (priority === 'Medium') {
		className += 'orange';
	} else if (priority === 'Low') {
		className += 'yellow';
	} else if (priority === 'Lowest') {
		className += 'green';
	}

	return (
		<div className={className}>
			<i className="fas fa-arrow-up" />
		</div>
	);
}

PriorityIcon.propTypes = {
	priorty: PropTypes.string
};

export default PriorityIcon;
