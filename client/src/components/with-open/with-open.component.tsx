import React from 'react';
import SidebarOpenButton from '../sidebar-open-button/sidebar-open-button.component';
import { connect } from 'react-redux';
import { openSidebar } from '../../store/sidebar/sidebar.actions';

interface IProps {
	openSidebar(): void;
	isSidebarOpen: boolean;
}

const withOpen = (Component) => {
	const Wrapper = () =>
		class extends React.Component<IProps> {
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
