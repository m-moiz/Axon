import { commentActionTypes } from './comment.types';

const INITIAL_STATE = {
	comments: [],
	isCreateCommentOn: false,
	isDeleteCommentOn: false
};

export const commentReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case commentActionTypes.SET_COMMENTS_ARRAY:
			return { ...state, comments: action.payload };
		case commentActionTypes.CREATE_COMMENT:
			return { ...state, isCreateCommentOn: !state.isCreateCommentOn };
		case commentActionTypes.DELETE_COMMENT:
			return { ...state, isDeleteCommentOn: !state.isDeleteCommentOn };
		default:
			return state;
	}
};
