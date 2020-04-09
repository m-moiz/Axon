import React from 'react';
import SidebarOpenButton from '../sidebar-open-button/sidebar-open-button.component';
import { connect } from 'react-redux';
import { openSidebar } from '../../store/sidebar/sidebar.actions';

const withOpen = (Component) => {
	const Wrapper = (props) =>
		class extends React.Component {
			handleClick = () => {
				this.props.openSidebar();
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
		openSidebar: () => dispatch(openSidebar())
	};
};

export default withOpen;
