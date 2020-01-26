import { commentActionTypes } from './comment.types';

export const setCommentsArray = (comments) => ({
	type: commentActionTypes.SET_COMMENTS_ARRAY,
	payload: comments
});

export const createComment = () => ({
	type: commentActionTypes.CREATE_COMMENT
});

export const deleteComment = () => ({
	type: commentActionTypes.DELETE_COMMENT
});
