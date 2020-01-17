import React from 'react';
import './status-icon.styles.scss';

function StatusIcon({ status }) {
	let className = 'status-icon';
	if (status === 'Open') {
		className += ' green';
	} else if (status === 'Closed') {
		className += ' red';
	}
	return <div className={className}>{status}</div>;
}

export default StatusIcon;
