import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './comment-header.styles.scss';

function CommentHeader({ username, date, isCreator, hasEdited }) {
	return (
		<div className="comment-header">
			<button className="button">{username}</button>
			{isCreator ? '' : <div style={{ marginRight: '.4rem' }}>commented on </div>}
			{isCreator ? '' : <div>{moment(date).format('DD-MM-YYYY')}</div>}
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
