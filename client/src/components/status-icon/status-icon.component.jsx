import React from 'react';
import './status-icon.styles.scss';

function StatusIcon({ isInteractible, handleClick, status }) {
	let className = 'status-icon';
	if (status === 'Open') {
		className += ' green';
	} else if (status === 'Closed') {
		className += ' red';
	}

	if (isInteractible) {
		className += ' interactible';
	}

	return (
		<React.Fragment>
			{isInteractible ? (
				<div onClick={handleClick} className={className}>
					{status}
				</div>
			) : (
				<div className={className}>{status}</div>
			)}
		</React.Fragment>
	);
}

export default StatusIcon;
