import React, { Component } from 'react';
import './notification.styles.scss';
import { toggleNotificationModal } from '../../store/message/message.actions';
import { connect } from 'react-redux';

interface INotification {
	toggleNotificationModal: () => void;
	isDarkTheme: Boolean;
}

class Notification extends Component<INotification> {
	handleClick = (e) => {
		e.preventDefault();
		this.props.toggleNotificationModal();
	};

	render() {
		return (
			<button
				aria-label="Notification"
				onClick={this.handleClick}
				className={this.props.isDarkTheme ? 'notif-bell dark' : 'notif-bell light'}
			>
				<i className="fas fa-bell" />
				<div className="red-circle" />
			</button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleNotificationModal: () => dispatch(toggleNotificationModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
