import React from 'react';
import PropTypes from 'prop-types';
import './tool.styles.scss';

const Tool = ({ children, tooltipText, isToolOpen, action }) => (
	<div className={isToolOpen ? 'tool toggled' : 'tool'} onClick={action}>
		<span className="tooltip-text">{tooltipText}</span>
		{children}
	</div>
);

Tool.propTypes = {
	children: PropTypes.node,
	tooltipText: PropTypes.string.isRequired,
	isToolOpen: PropTypes.bool,
	action: PropTypes.func
};

export default Tool;
