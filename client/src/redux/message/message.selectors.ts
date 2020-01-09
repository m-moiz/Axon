import { createSelector } from 'reselect';

const selectMessage = (state) => state.message;

export const selectShouldRenderMessage = createSelector([ selectMessage ], (message) => message.shouldRenderMessage);
export const selectIsOpeningMessage = createSelector([ selectMessage ], (message) => message.isOpeningMessage);
export const selectIsClosingMessage = createSelector([ selectMessage ], (message) => message.isClosingMessage);
export const selectMessageText = createSelector([ selectMessage ], (message) => message.messageText);
