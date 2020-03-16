import React from 'react';
import PropTypes from 'prop-types';
import { toggleSidebarItemVisibility } from '../../redux/sidebar/sidebar.actions';
import { selectSidebarItemHiddenProperty } from '../../redux/sidebar/sidebar.selectors';
import { connect } from 'react-redux';
import './sidebar-item.styles.scss';

function SideBarItem({ item, children, show, toggleSidebarItemVisibility, isSidebarItemVisible, isDarkTheme }) {
	let className = '';
	let classOfRecurseItem = '';
	if (show && isSidebarItemVisible === false) {
		className = 'fas fa-caret-right';
	} else if (show && isSidebarItemVisible === true) {
		className = 'fas fa-caret-down';
	} else {
		className = '';
	}

	if (isSidebarItemVisible) {
		classOfRecurseItem = 'sidebar-recurse-item';
	} else {
		classOfRecurseItem = 'sidebar-recurse-item closed';
	}

	return (
		<div>
			<div
				className={isDarkTheme ? 'sidebar-item dark' : 'sidebar-item light'}
				onClick={() => toggleSidebarItemVisibility(item)}
			>
				<i className={className} />
				<li>{item}</li>
			</div>

			<div className={classOfRecurseItem}>{children}</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		isSidebarItemVisible: selectSidebarItemHiddenProperty(ownProps.item)(state),
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSidebarItemVisibility: (itemName) => dispatch(toggleSidebarItemVisibility(itemName))
	};
};

SideBarItem.propTypes = {
	item: PropTypes.node,
	children: PropTypes.node,
	show: PropTypes.bool.isRequired,
	toggleSidebarItemVisibility: PropTypes.func.isRequired,
	isSidebarItemVisible: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarItem);
