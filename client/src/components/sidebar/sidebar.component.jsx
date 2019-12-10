import React from 'react';
import './sidebar.styles.scss';

const Sidebar = ({ children, title, option }) => (
	<div className="sidebar">
		<div className="title">
			<h5>{title}</h5>
			<p>🔨</p>
		</div>

		{children}
	</div>
);

export default Sidebar;
