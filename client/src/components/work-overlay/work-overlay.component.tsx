import React from 'react';
import './work-overlay.styles.scss';

interface IWorkOverlay {
	task: string;
}

function WorkOverlay({ task }: IWorkOverlay) {
	return (
		<div className="work-wrapper">
			<div className="work-overlay">
				<p className="working-on">You are working on </p>
				<p className="task">{task}</p>
				<div className="overlay-border" />
			</div>
		</div>
	);
}

export default WorkOverlay;
