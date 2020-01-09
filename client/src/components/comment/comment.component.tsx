import React from 'react';
import './comment.styles.scss';

function Comment({ children }) {
	return (
		<div className="comment">
			<p>{children}</p>
		</div>
	);
}

export default Comment;
