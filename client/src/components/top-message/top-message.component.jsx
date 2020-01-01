import React from 'react';
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
		className = 'top-message fadeIn';
	} else if (isClosingMessage && !isOpeningMessage) {
		className = 'top-message fadeOut';
	} else if (!isClosingMessage && !isOpeningMessage) {
		className = 'top-message';
	}

	return (
		<React.Fragment>
			{shouldRenderMessage ? (
				<div className={className}>
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

export default connect(mapStateToProps)(TopMessage);
