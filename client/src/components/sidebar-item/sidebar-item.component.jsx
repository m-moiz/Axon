import React from 'react';
import './sidebar-item.styles.scss';

const SideBarItem = ({ item, children, show }) => (
	<div>
		<div className="sidebar-item">
			{show ? <i className="fas fa-caret-right" /> : ''}

			<li>{item}</li>
		</div>

		<div className="sidebar-recurse-item">{children}</div>
	</div>
);

export default SideBarItem;
