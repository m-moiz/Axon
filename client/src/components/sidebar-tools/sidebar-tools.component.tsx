import React from 'react';
import './sidebar-tools.styles.scss';

interface ISideBarTools {
	children: React.ReactNode;
	isSidebarSubcategoryOpen?: Boolean;
}

const SideBarTools = ({ children, isSidebarSubcategoryOpen }: ISideBarTools) => (
	<div className={isSidebarSubcategoryOpen ? 'sidebar-tools' : 'sidebar-tools closed'}>{children}</div>
);

export default SideBarTools;
