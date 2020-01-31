import React from 'react';
import CommentBox from '../comment-box/comment-box.component';
import ToggleItem from '../toggle-item/toggle-item.component';
import './comment-list.styles.scss';

function CommentList({ isCommentsVisible, toggleComments, comments }) {
	return (
		<div className="comment-list">
			<ToggleItem isOpen={isCommentsVisible} handleClick={toggleComments} title="Comments" />
			{Array.isArray(comments) && comments.length > 0 && isCommentsVisible ? (
				comments.map((comment) => (
					<CommentBox
						key={comment._id}
						commentText={comment.text}
						username={comment.nameOfPoster}
						date={comment.post_time}
					/>
				))
			) : (
				''
			)}
		</div>
	);
}

export default CommentList;
