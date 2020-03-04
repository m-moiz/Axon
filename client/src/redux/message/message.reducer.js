import { messageActionTypes } from './message.types';

const INITIAL_STATE = {
	shouldRenderMessage: false,
	isOpeningMessage: false,
	isClosingMessage: false,
	isNotificationModalOpen: false,
	messageText: ''
};

export const messageReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case messageActionTypes.TOGGLE_SHOULD_RENDER_MESSAGE:
			return { ...state, shouldRenderMessage: !state.shouldRenderMessage };
		case messageActionTypes.TOGGLE_IS_OPENING_MESSAGE:
			return { ...state, isOpeningMessage: !state.isOpeningMessage };
		case messageActionTypes.TOGGLE_NOTIFICATION_MODAL:
			return { ...state, isNotificationModalOpen: !state.isNotificationModalOpen };
		case messageActionTypes.TOGGLE_IS_CLOSING_MESSAGE:
			return { ...state, isClosingMessage: !state.isClosingMessage };
		case messageActionTypes.SET_MESSAGE_TEXT:
			return { ...state, messageText: action.payload };
		default:
			return state;
	}
};
