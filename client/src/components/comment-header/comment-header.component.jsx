import React from 'react';
import PropTypes from 'prop-types';
import './comment-header.styles.scss';

function CommentHeader({ username, date, hasEdited }) {
	return (
		<div className="comment-header">
			<button>{username}</button>
			<div>commented on</div>
			<div>{date}</div>
			<div>hasEdited</div>
		</div>
	);
}

CommentHeader.propTypes = {
	username: PropTypes.string,
	date: PropTypes.string,
	hasEdited: PropTypes.bool
};

export default CommentHeader;
