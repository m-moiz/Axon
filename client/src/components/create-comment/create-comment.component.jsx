import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentHeader from '../comment-header/comment-header.component';
import CommentFooter from '../comment-footer/comment-footer.component';
import './create-comment.styles.scss';

class CreateComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentText: ''
		};
	}

	handleCommentChange = (e) => {
		this.setState({ commentText: e.target.value });
	};

	handleCommentSubmit = (e) => {
		e.preventDefault();
		axios
			.post({
				url: `/api/comment/${this.props.issueId}&${this.props.userId}/create`,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					commentText: this.state.commentText
				}
			})
			.then((resp) => {
				console.log(resp);
			});
	};

	render() {
		return (
			<form onSubmit={this.handleCommentSubmit} className="create-comment">
				<CommentHeader username={this.props.username} hasEdited={this.props.hasEdited} date={this.props.date} />
				<textarea value={this.state.value} onChange={this.handleCommentChange} style={{ height: '100%' }} />
				<CommentFooter showCreateButton likes={this.props.likes} />
			</form>
		);
	}
}

CreateComment.propTypes = {
	username: PropTypes.string,
	hasEdited: PropTypes.string,
	date: PropTypes.string,
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
	likes: PropTypes.string
};

export default CreateComment;
