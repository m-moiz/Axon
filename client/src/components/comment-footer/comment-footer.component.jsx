import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './comment-footer.styles.scss';

function CommentFooter({ showCreateButton, likes }) {
	return (
		<div className="comment-footer">
			{showCreateButton ? (
				<CustomButton type="submit" width="90%" marginRight=".8rem" color="inherit">
					Create
				</CustomButton>
			) : (
				''
			)}
		</div>
	);
}

export default CommentFooter;
