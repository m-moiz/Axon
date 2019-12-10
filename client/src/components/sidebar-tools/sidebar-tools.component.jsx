import React from 'react';
import './sidebar-tools.styles.scss';

const SideBarTools = ({ children, isSidebarSubcategoryOpen }) => (
	<div className={isSidebarSubcategoryOpen ? 'sidebar-tools' : 'sidebar-tools closed'}>{children}</div>
);

export default SideBarTools;
