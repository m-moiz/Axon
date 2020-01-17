import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './comment-footer.styles.scss';

function CommentFooter({ showCreateButton, likes }) {
	return (
		<div className="comment-footer">
			{showCreateButton ? <div>{likes} likes</div> : <CustomButton left="80%">Create</CustomButton>}
		</div>
	);
}

export default CommentFooter;
