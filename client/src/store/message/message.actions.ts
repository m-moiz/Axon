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

export const toggleNotificationModal = () => ({
	type: messageActionTypes.TOGGLE_NOTIFICATION_MODAL
});

export const openingMessage = () => (dispatch) =>
	new Promise((resolve, reject) => {
		const openingTime = 3000;
		batch(() => {
			dispatch(toggleShouldRenderMessage());
			dispatch(toggleIsOpeningMessage());
		});
		setTimeout(() => {
			dispatch(toggleIsOpeningMessage());
			resolve();
		}, openingTime);
	});

export function closingMessage() {
	return (dispatch) => {
		const closingTime = 2000;
		dispatch(toggleIsClosingMessage());
		setTimeout(() => {
			batch(() => {
				dispatch(toggleIsClosingMessage());
				dispatch(toggleShouldRenderMessage());
			});
		}, closingTime);
	};
}

export const closingMessageAfterOpening = () => (dispatch) => {
	return dispatch(openingMessage()).then(() => {
		dispatch(closingMessage());
	});
};
