import React from 'react';
import { connect } from 'react-redux';
import './sidebar-subcategory.styles.scss';

interface ISideBarSubcategory {
	children: React.ReactNode;
	subcategoryName?: string;
	toggleSidebarSubcategory: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
	isDarkTheme: boolean;
}

const SideBarSubCategory = ({
	children,
	subcategoryName,
	toggleSidebarSubcategory,
	isDarkTheme
}: ISideBarSubcategory) => (
	<div className="sidebar-subcategory">
		<div className={isDarkTheme ? 'sidebar-subcategory-title dark' : 'sidebar-subcategory-title light'}>
			<p onClick={toggleSidebarSubcategory}>{subcategoryName.toUpperCase()}</p>
		</div>

		<div className="sidebar-items">{children}</div>
	</div>
);

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(SideBarSubCategory);
