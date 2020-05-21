import React from 'react';
import dayjs from 'dayjs';
import './comment-header.styles.scss';

interface ICommentHeader {
	username?: string;
	date?: string;
	isCreator?: boolean;
	hasEdited?: boolean;
}

function CommentHeader({ username, date, isCreator, hasEdited }: ICommentHeader) {
	const deleteComment = (e) => {};

	return (
		<div className="comment-header">
			<button className="button">{username}</button>
			{isCreator ? '' : <div style={{ marginRight: '.4rem' }}>commented on </div>}
			{isCreator ? '' : <div>{dayjs(date).format('d MMMM YYYY')}</div>}
			{isCreator ? '' : <div>{hasEdited}</div>}
			{isCreator ? <i className="fas fa-trash" onClick={deleteComment} /> : ''}
		</div>
	);
}

export default CommentHeader;
