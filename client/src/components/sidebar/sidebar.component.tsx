import React from 'react';
import './sidebar.styles.scss';
import { closeSidebar } from '../../store/sidebar/sidebar.actions';
import { selectIsSidebarClosing, selectIsSidebarOpening } from '../../store/sidebar/sidebar.selectors';
import { connect } from 'react-redux';

interface ISidebar {
	children: React.ReactNode;
	title: string;
	isSidebarOpening: Boolean;
	isSidebarClosing: Boolean;
	closeSidebar: () => void;
	isDarkTheme?: Boolean;
}

function Sidebar({ children, title, isSidebarOpening, isSidebarClosing, closeSidebar, isDarkTheme }: ISidebar) {
	let className;
	if (isSidebarClosing) {
		className = 'sidebar sidebar-close';
	} else if (isSidebarOpening) {
		className = 'sidebar sidebar-open';
	} else {
		className = 'sidebar';
	}

	if (isDarkTheme) {
		className += ' dark';
	} else {
		className += ' light';
	}

	return (
		<div role="navigation" className={className}>
			<div className="title">
				<h5>{title}</h5>
				<span role="img" aria-label="hammer">
					🔨
				</span>

				{!(isSidebarClosing || isSidebarOpening) ? (
					<button
						onClick={() => {
							closeSidebar();
						}}
						className="sidebar__back"
						aria-label="sidebar close"
					>
						<i className="fas fa-angle-left" />
					</button>
				) : (
					''
				)}
			</div>

			{children}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isSidebarClosing: selectIsSidebarClosing(state),
		isSidebarOpening: selectIsSidebarOpening(state),
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeSidebar: () => dispatch(closeSidebar())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
