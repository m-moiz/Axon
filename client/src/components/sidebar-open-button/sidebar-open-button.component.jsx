import React from 'react';
import './sidebar-open-button.styles.scss';

const SidebarOpenButton = ({ handleClick }) => (
	<div className="sidebar__right" onClick={handleClick}>
		<i className="fas fa-angle-right" />
	</div>
);

export default SidebarOpenButton;
