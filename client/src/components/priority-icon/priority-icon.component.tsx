import React from 'react';
import './priority-icon.styles.scss';

interface IPriority {
	priority: 'High' | 'Medium' | 'Low' | 'Lowest';
}

function PriorityIcon({ priority }: IPriority) {
	let className = 'priority-icon ';
	className += {
		High: 'red',
		Medium: 'orange',
		Low: 'yellow',
		Lowest: 'green'
	}[priority];

	return (
		<div className={className}>
			<i className="fas fa-arrow-up" />
		</div>
	);
}

export default PriorityIcon;
