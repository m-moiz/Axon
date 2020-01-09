import React from 'react';
import PropTypes from 'prop-types';
import CommentHeader from '../comment-header/comment-header.component';
import CommentFooter from '../comment-footer/comment-footer.component';
import Comment from '../comment/comment.component';
import './comment-box.styles.scss';

function CommentBox({ commentText }) {
	return (
		<div className="comment-box">
			<CommentHeader />
			<Comment>{commentText}</Comment>
			<CommentFooter />
		</div>
	);
}

CommentBox.propTypes = {
	commentText: PropTypes.string
};

export default CommentBox;
