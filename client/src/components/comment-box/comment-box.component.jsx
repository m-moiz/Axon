import React from 'react';
import PropTypes from 'prop-types';
import CommentHeader from '../comment-header/comment-header.component';
import CommentFooter from '../comment-footer/comment-footer.component';
import Comment from '../comment/comment.component';
import './comment-box.styles.scss';

function CommentBox({ commentText, username, date }) {
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

CommentBox.propTypes = {
	commentText: PropTypes.string
};

export default CommentBox;
