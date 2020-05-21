import React from 'react';
import './comment.styles.scss';

interface IComment {
	children: React.ReactNode;
}

function Comment({ children }: IComment) {
	return (
		<div className="comment">
			<p>{children}</p>
		</div>
	);
}

export default Comment;
