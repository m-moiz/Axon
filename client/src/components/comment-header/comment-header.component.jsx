import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import './comment-header.styles.scss';

function CommentHeader({ username, date, isCreator, hasEdited }) {
	return (
		<div className="comment-header">
			<button className="button">{username}</button>
			{isCreator ? '' : <div style={{ marginRight: '.4rem' }}>commented on </div>}
			{isCreator ? '' : <div>{dayjs(date).format('d MMMM YYYY')}</div>}
			{isCreator ? '' : <div>{hasEdited}</div>}
		</div>
	);
}

CommentHeader.propTypes = {
	username: PropTypes.string,
	date: PropTypes.string,
	hasEdited: PropTypes.bool,
	isCreator: PropTypes.bool
};

export default CommentHeader;
