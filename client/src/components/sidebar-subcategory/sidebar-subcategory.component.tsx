import React from 'react';
import PropTypes from 'prop-types';
import './sidebar-subcategory.styles.scss';

const SideBarSubCategory = ({ children, subcategoryName, toggleSidebarSubcategory }) => (
	<div className="sidebar=subcategory">
		<div className="sidebar-subcategory-title">
			<p onClick={toggleSidebarSubcategory}>{subcategoryName.toUpperCase()}</p>
		</div>

		<div className="sidebar-items">{children}</div>
	</div>
);

SideBarSubCategory.propTypes = {
	children: PropTypes.node,
	subcategoryName: PropTypes.string.isRequired,
	toggleSidebarSubcategory: PropTypes.func.isRequired
};

export default SideBarSubCategory;
