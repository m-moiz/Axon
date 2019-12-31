import React from 'react';
import './sidebar.styles.scss';
import { toggleSidebar, toggleSidebarIsClosing } from '../../redux/sidebar/sidebar.actions';
import { selectIsSidebarClosing, selectIsSidebarOpening } from '../../redux/sidebar/sidebar.selectors';
import { toggleWithClosingAnimation } from '../../utils/toggle-with-anim';
import { connect } from 'react-redux';

function Sidebar({ children, title, isSidebarOpening, isSidebarClosing, toggleSidebar, toggleSidebarIsClosing }) {
	let className;
	if (isSidebarClosing) {
		className = 'sidebar sidebar-close';
	} else if (isSidebarOpening) {
		className = 'sidebar sidebar-open';
	} else {
		className = 'sidebar';
	}
	return (
		<div className={className}>
			<div className="title">
				<h5>{title}</h5>
				<p>🔨</p>
			</div>
			{!(isSidebarClosing || isSidebarOpening) ? (
				<div
					onClick={() => {
						toggleWithClosingAnimation(toggleSidebar, toggleSidebarIsClosing, 500);
					}}
					className="sidebar__back"
				>
					<i className="fas fa-angle-left" />
				</div>
			) : (
				''
			)}

			{children}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isSidebarClosing: selectIsSidebarClosing(state),
		isSidebarOpening: selectIsSidebarOpening(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSidebar: () => dispatch(toggleSidebar()),
		toggleSidebarIsClosing: () => dispatch(toggleSidebarIsClosing())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
