import { messageActionTypes } from './message.types';
import { batch } from 'react-redux';

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

export const openingMessage = () => (dispatch) =>
	new Promise((resolve, reject) => {
		batch(() => {
			dispatch(toggleShouldRenderMessage());
			dispatch(toggleIsOpeningMessage());
		});
		setTimeout(() => {
			dispatch(toggleIsOpeningMessage());
			resolve();
		}, 2000);
	});

export function closingMessage() {
	return (dispatch) => {
		dispatch(toggleIsClosingMessage());
		setTimeout(() => {
			batch(() => {
				dispatch(toggleIsClosingMessage());
				dispatch(toggleShouldRenderMessage());
			});
		}, 1500);
	};
}

export const closingMessageAfterOpening = () => (dispatch) => {
	return dispatch(openingMessage()).then(() => {
		dispatch(closingMessage());
	});
};
