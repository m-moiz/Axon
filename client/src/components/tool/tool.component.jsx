import React from 'react';
import './tool.styles.scss';

const Tool = ({ children, tooltipText, toggleTool, action }) => (
	<div className={toggleTool ? 'tool toggled' : 'tool'} onClick={action}>
		<span className="tooltip-text">{tooltipText}</span>
		{children}
	</div>
);

export default Tool;
