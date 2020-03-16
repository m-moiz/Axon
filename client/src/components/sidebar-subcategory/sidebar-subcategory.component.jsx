import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './sidebar-subcategory.styles.scss';

const SideBarSubCategory = ({ children, subcategoryName, toggleSidebarSubcategory, isDarkTheme }) => (
	<div className="sidebar-subcategory">
		<div className={isDarkTheme ? 'sidebar-subcategory-title dark' : 'sidebar-subcategory-title light'}>
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

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(SideBarSubCategory);
