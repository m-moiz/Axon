import React from 'react';
import './top-message.styles.scss';
import { connect } from 'react-redux';
import {
	selectIsOpeningMessage,
	selectIsClosingMessage,
	selectShouldRenderMessage
} from '../../store/message/message.selectors';

interface ITopMessage {
	messageContent: string;
	isOpeningMessage?: Boolean;
	isClosingMessage?: Boolean;
	shouldRenderMessage?: Boolean;
}

function TopMessage({ messageContent, isOpeningMessage, isClosingMessage, shouldRenderMessage }: ITopMessage) {
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

export default connect(mapStateToProps)(TopMessage);
