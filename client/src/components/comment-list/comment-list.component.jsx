import React from 'react';
import CommentBox from '../comment-box/comment-box.component';
import ToggleItem from '../toggle-item/toggle-item.component';
import { animated } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
import './comment-list.styles.scss';

function CommentList({ isCommentsVisible, toggleComments, comments }) {
	return (
		<div className="comment-list">
			<ToggleItem isOpen={isCommentsVisible} handleClick={toggleComments} title="Comments" />
			{Array.isArray(comments) && comments.length > 0 ? (
				comments.map((comment) => (
					<Transition
						items={isCommentsVisible}
						from={{ opacity: 0 }}
						enter={{ opacity: 1 }}
						leave={{ opacity: 0 }}
						config={{ duration: 150 }}
					>
						{(show) =>
							show &&
							((props) => (
								<animated.div style={props}>
									<CommentBox
										key={comment._id}
										commentText={comment.text}
										username={comment.nameOfPoster}
										date={comment.post_time}
									/>
								</animated.div>
							))}
					</Transition>
				))
			) : (
				''
			)}
		</div>
	);
}

export default CommentList;
