import React from 'react';
import { toggleSidebarItemVisibility } from '../../redux/sidebar/sidebar.actions';
import { selectSidebarItemHiddenProperty } from '../../redux/sidebar/sidebar.selectors';
import { connect } from 'react-redux';
import './sidebar-item.styles.scss';

function SideBarItem({ item, children, show, toggleSidebarItemVisibility, isSidebarItemVisible }) {
	let className = '';
	if (show && isSidebarItemVisible === false) {
		className = 'fas fa-caret-right';
	} else if (show && isSidebarItemVisible === true) {
		className = 'fas fa-caret-down';
	} else {
		className = '';
	}

	return (
		<div>
			<div className="sidebar-item" onClick={() => toggleSidebarItemVisibility(item)}>
				<i className={className} />

				<li>{item}</li>
			</div>

			<div className={isSidebarItemVisible ? 'sidebar-recurse-item' : 'sidebar-recurse-item closed'}>
				{children}
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		isSidebarItemVisible: selectSidebarItemHiddenProperty(ownProps.item)(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSidebarItemVisibility: (itemName) => dispatch(toggleSidebarItemVisibility(itemName))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarItem);
