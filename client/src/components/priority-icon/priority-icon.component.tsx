import React from 'react';
import './priority-icon.styles.scss';

interface IPriority {
	priority: 'High' | 'Medium' | 'Low' | 'Lowest';
}

function PriorityIcon({ priority }: IPriority) {
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

export default PriorityIcon;
