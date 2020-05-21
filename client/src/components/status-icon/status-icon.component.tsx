import React from 'react';
import './status-icon.styles.scss';

interface IStatusIcon {
	isInteractible: boolean;
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	status: string;
}

function StatusIcon({ isInteractible, handleClick, status }: IStatusIcon) {
	let className = 'status-icon';
	className += {
		Open: ' green',
		Closed: ' red'
	}[status];

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
