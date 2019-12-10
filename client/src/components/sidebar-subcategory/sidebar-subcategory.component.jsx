import React from 'react';
import './sidebar-subcategory.styles.scss';

const SideBarSubCategory = ({ children, subcategoryName, toggleSidebarSubcategory }) => (
	<div className="sidebar=subcategory">
		<div className="sidebar-subcategory-title">
			<p onClick={toggleSidebarSubcategory}>{subcategoryName.toUpperCase()}</p>
		</div>

		<div className="sidebar-items">{children}</div>
	</div>
);

export default SideBarSubCategory;
