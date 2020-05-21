import React from 'react';
import { toggleSidebarItemVisibility } from '../../store/sidebar/sidebar.actions';
import { selectSidebarItemHiddenProperty } from '../../store/sidebar/sidebar.selectors';
import { connect } from 'react-redux';
import './sidebar-item.styles.scss';

interface ISideBarItem {
	item?: string;
	children: React.ReactNode;
	show: boolean;
	toggleSidebarItemVisibility: (item: string) => void;
	isSidebarItemVisible: boolean;
	isDarkTheme: boolean;
}

function SideBarItem({
	item,
	children,
	show,
	toggleSidebarItemVisibility,
	isSidebarItemVisible,
	isDarkTheme
}: ISideBarItem) {
	let className = '';
	let classOfRecurseItem = '';
	if (show && isSidebarItemVisible === false) {
		className = 'fas fa-caret-right';
	} else if (show && isSidebarItemVisible === true) {
		className = 'fas fa-caret-down';
	}

	classOfRecurseItem = isSidebarItemVisible ? 'sidebar-recurse-item' : 'sidebar-recurse-item closed';

	return (
		<div>
			<ul
				className={isDarkTheme ? 'sidebar-item dark' : 'sidebar-item light'}
				onClick={() => toggleSidebarItemVisibility(item)}
			>
				<li>
					<i className={className} />
					{item}
				</li>
			</ul>

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

export default connect(mapStateToProps, mapDispatchToProps)(SideBarItem);
