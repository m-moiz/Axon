import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './comment-footer.styles.scss';

interface CommentFooter {
	showCreateButton: Boolean;
	likes: number;
}

function CommentFooter({ showCreateButton, likes }: CommentFooter) {
	return (
		<div className="comment-footer">
			{showCreateButton ? (
				<CustomButton type="submit" width="90%" marginRight=".8rem">
					Create
				</CustomButton>
			) : (
				''
			)}
		</div>
	);
}

export default CommentFooter;
