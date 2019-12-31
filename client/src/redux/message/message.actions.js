import { messageActionTypes } from './message.types';

export const toggleShouldRenderMessage = () => ({
	type: messageActionTypes.TOGGLE_SHOULD_RENDER_MESSAGE
});

export const toggleIsOpeningMessage = () => ({
	type: messageActionTypes.TOGGLE_IS_OPENING_MESSAGE
});

export const toggleIsClosingMessage = () => ({
	type: messageActionTypes.TOGGLE_IS_CLOSING_MESSAGE
});

export const setMessageText = (message) => ({
	type: messageActionTypes.SET_MESSAGE_TEXT,
	payload: message
});
