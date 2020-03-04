import React from 'react';
import { selectIsNotificationModalOpen } from '../../redux/message/message.selectors';
import { connect } from 'react-redux';
import './notification-modal.styles.scss';

function NotificationModal({ isNotificationModalOpen }) {
	console.log(isNotificationModalOpen);
	return (
		<React.Fragment>
			{isNotificationModalOpen ? (
				<div className="notif-modal box">
					<h2 className="title">
						<span>Notifications</span>
						<i className="fas fa-bolt" />
					</h2>
					<ul>
						<li>
							<div className="notif-row">
								<p className="notif">Ada assigned you to issue#657 in Axon</p>
								<div className="notif-time">
									<i className="fas fa-history" />
									<p>1d </p>
								</div>
							</div>
							<hr />
						</li>
						<li>
							<div className="notif-row">
								<p className="notif">Ada assigned you to issue#657</p>
								<div className="notif-time">
									<i className="fas fa-history" />
									<p>1d </p>
								</div>
							</div>
							<hr />
						</li>
						<li>
							<div className="notif-row">
								<p className="notif">Ada assigned you to issue#657</p>
								<div className="notif-time">
									<i className="fas fa-history" />
									<p>1d </p>
								</div>
							</div>
							<hr />
						</li>
					</ul>
				</div>
			) : (
				''
			)}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		isNotificationModalOpen: state.message.isNotificationModalOpen
	};
};

export default connect(mapStateToProps)(NotificationModal);
