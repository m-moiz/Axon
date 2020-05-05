import React from 'react';
import './tool.styles.scss';

interface ITool {
	children: React.ReactNode;
	tooltipText?: string;
	isToolOpen?: Boolean;
	action: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Tool = ({ children, tooltipText, isToolOpen, action }: ITool) => (
	<div className={isToolOpen ? 'tool toggled' : 'tool'} onClick={action}>
		<span className="tooltip-text">{tooltipText}</span>
		{children}
	</div>
);

export default Tool;
