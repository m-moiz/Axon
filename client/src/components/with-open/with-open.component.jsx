import React from 'react';
import SidebarOpenButton from '../sidebar-open-button/sidebar-open-button.component';
import { connect } from 'react-redux';
import { toggleSidebarIsOpening, toggleSidebar } from '../../redux/sidebar/sidebar.actions';
import { toggleWithOpeningAnimation } from '../../utils/toggle-with-anim';

const withOpen = (Component) => {
	const Wrapper = (props) =>
		class extends React.Component {
			handleClick = () => {
				toggleWithOpeningAnimation(this.props.toggleSidebar, this.props.toggleSidebarIsOpening, 500);
			};
			render() {
				if (this.props.isSidebarOpen) {
					return <Component {...this.props} />;
				} else {
					return <SidebarOpenButton handleClick={this.handleClick} />;
				}
			}
		};

	return connect(null, mapDispatchToProps)(Wrapper());
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSidebar: () => dispatch(toggleSidebar()),
		toggleSidebarIsOpening: () => dispatch(toggleSidebarIsOpening())
	};
};

export default withOpen;
