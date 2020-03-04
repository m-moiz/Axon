import React, { Component } from 'react';
import './notification.styles.scss';
import { toggleNotificationModal } from '../../redux/message/message.actions';
import { connect } from 'react-redux';

class Notification extends Component {
	handleClick = (e) => {
		e.preventDefault();
		this.props.toggleNotificationModal();
	};

	render() {
		return (
			<button onClick={this.handleClick} className="notif-bell">
				<i className="fas fa-bell" />
				<div className="red-circle" />
			</button>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleNotificationModal: () => dispatch(toggleNotificationModal())
	};
};

export default connect(null, mapDispatchToProps)(Notification);
