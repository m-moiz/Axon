import React from 'react';
import './comment-header.styles.scss';

function CommentHeader() {
	return (
		<div className="comment-header">
			<link>username</link>
			<div>commented on</div>
			<div>date</div>
			<div>hasEdited</div>
		</div>
	);
}

export default CommentHeader;
