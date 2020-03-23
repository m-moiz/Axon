import React from 'react';
import PropTypes from 'prop-types';
import './top-message.styles.scss';
import { connect } from 'react-redux';
import {
	selectIsOpeningMessage,
	selectIsClosingMessage,
	selectShouldRenderMessage
} from '../../redux/message/message.selectors';

function TopMessage({ messageContent, isOpeningMessage, isClosingMessage, shouldRenderMessage }) {
	let className = '';
	if (isOpeningMessage && !isClosingMessage) {
		className = 'top-message starting';
	} else if (isClosingMessage && !isOpeningMessage) {
		className = 'top-message ending';
	} else if (!isClosingMessage && !isOpeningMessage) {
		className = 'top-message';
	}

	return (
		<React.Fragment>
			{shouldRenderMessage ? (
				<div className={className}>
					<i className="fas fa-check-circle" />
					<p className="top-message__text">{messageContent}</p>
				</div>
			) : (
				''
			)}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		isOpeningMessage: selectIsOpeningMessage(state),
		isClosingMessage: selectIsClosingMessage(state),
		shouldRenderMessage: selectShouldRenderMessage(state)
	};
};

TopMessage.propTypes = {
	messageContent: PropTypes.string.isRequired,
	isOpeningMessage: PropTypes.bool.isRequired,
	isClosingMessage: PropTypes.bool.isRequired,
	shouldRenderMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(TopMessage);
