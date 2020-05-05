import React from 'react';
import CommentHeader from '../comment-header/comment-header.component';
import CommentFooter from '../comment-footer/comment-footer.component';
import Comment from '../comment/comment.component';
import './comment-box.styles.scss';

interface CommentBox {
	commentText: string;
	username: string;
	date: string;
}

function CommentBox({ commentText, username, date }: CommentBox) {
	return (
		<React.Fragment>
			<div className="comment-box">
				<CommentHeader username={username} date={date} />
				<Comment>{commentText}</Comment>
				<CommentFooter />
			</div>

			<div className="line" />
		</React.Fragment>
	);
}

export default CommentBox;
