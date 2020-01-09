import React from 'react';
import PropTypes from 'prop-types';
import './sidebar-tools.styles.scss';

const SideBarTools = ({ children, isSidebarSubcategoryOpen }) => (
	<div className={isSidebarSubcategoryOpen ? 'sidebar-tools' : 'sidebar-tools closed'}>{children}</div>
);

SideBarTools.propTypes = {
	children: PropTypes.node.isRequired,
	isSidebarSubcategoryOpen: PropTypes.bool.isRequired
};

export default SideBarTools;
