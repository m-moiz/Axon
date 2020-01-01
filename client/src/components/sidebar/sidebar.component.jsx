import React from 'react';
import PropTypes from 'prop-types';
import './sidebar.styles.scss';
import { closeSidebar } from '../../redux/sidebar/sidebar.actions';
import { selectIsSidebarClosing, selectIsSidebarOpening } from '../../redux/sidebar/sidebar.selectors';
import { connect } from 'react-redux';

function Sidebar({ children, title, isSidebarOpening, isSidebarClosing, closeSidebar }) {
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
						closeSidebar();
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
		closeSidebar: () => dispatch(closeSidebar())
	};
};

Sidebar.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	isSidebarOpening: PropTypes.bool,
	isSidebarClosing: PropTypes.bool,
	closeSidebar: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
