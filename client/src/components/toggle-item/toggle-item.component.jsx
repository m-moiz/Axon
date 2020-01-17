import React from 'react';
import './toggle-item.styles.scss';

function ToggleItem({ title, marginTop }) {
	return (
		<div className="toggle-item" style={{ marginTop: marginTop }}>
			<i className="fas fa-caret-down" style={{ marginRight: '.4rem', marginTop: '.2rem' }} />
			<span>{title}</span>
		</div>
	);
}

export default ToggleItem;
