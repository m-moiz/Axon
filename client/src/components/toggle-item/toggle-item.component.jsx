import React from 'react';
import './toggle-item.styles.scss';

function ToggleItem({ isOpen, handleClick, title, marginTop }) {
	let className = '';
	if (isOpen) {
		className = 'fas fa-caret-down';
	} else {
		className = 'fas fa-caret-right';
	}

	return (
		<div onClick={handleClick} className="toggle-item" style={{ marginTop: marginTop }}>
			<i className={className} style={{ marginRight: '.4rem', marginTop: '.2rem' }} />
			<span>{title}</span>
		</div>
	);
}

export default ToggleItem;
