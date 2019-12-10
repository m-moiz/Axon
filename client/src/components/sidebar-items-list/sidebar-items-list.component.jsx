import React from 'react';
import SideBarItem from '../sidebar-item/sidebar-item.component';
import './sidebar-items-list.styles.scss';

const SideBarItemsList = ({ items, isSidebarSubcategoryOpen }) => (
	<div className={isSidebarSubcategoryOpen ? 'sidebar-items-list' : 'sidebar-items-list closed'}>
		{items.map((item) => (
			<SideBarItem key={item._id} item={item.name} show>
				<SideBarItem item="Issues" show />
				<SideBarItem item="Board" show />
			</SideBarItem>
		))}
	</div>
);

export default SideBarItemsList;
