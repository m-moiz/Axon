import React from 'react';
import CommentBox from '../comment-box/comment-box.component';
import './comment-list.styles.scss';

function CommentList({ comments }) {
	return (
		<div className="comment-list">
			{Array.isArray(comments) && comments.length > 0 ? comments.map((comment) => <CommentBox />) : ''}
		</div>
	);
}

export default CommentList;
