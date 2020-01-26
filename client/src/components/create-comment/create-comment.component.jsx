import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentHeader from '../comment-header/comment-header.component';
import CommentFooter from '../comment-footer/comment-footer.component';
import { setMessageText, closingMessageAfterOpening } from '../../redux/message/message.actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './create-comment.styles.scss';

class CreateComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentText: '',
			isFocused: false
		};
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClick, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick, false);
	}

	hasClickedOutsideContainer(event) {
		return this.wrapperRef && !this.wrapperRef.contains(event.target);
	}

	handleClick = (event) => {
		if (this.hasClickedOutsideContainer(event)) {
			this.setState({ ...this.state, isFocused: false });
		} else {
			this.setState((prevState) => ({ ...prevState, isFocused: true }));
		}
	};

	handleCommentChange = (e) => {
		this.setState({ commentText: e.target.value });
	};

	handleCommentSubmit = (e) => {
		e.preventDefault();
		axios({
			method: 'post',
			url: `/api/comment/${this.props.issueId}&${this.props.userId}/create`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				commentText: this.state.commentText,
				username: this.props.username,
				projectId: this.props.projectId,
				teamId: this.props.teamId
			}
		}).then((resp) => {
			this.props.setMessageText('Comment created successfully');
			this.props.closingMessageAfterOpening();
			this.props.history.push('/empty');
			this.props.history.replace('/user/issue');
		});
	};

	setWrapperRef = (node) => {
		this.wrapperRef = node;
	};

	render() {
		return (
			<form
				ref={this.setWrapperRef}
				onSubmit={this.handleCommentSubmit}
				className={this.state.isFocused ? 'create-comment focused' : 'create-comment'}
			>
				<CommentHeader username={this.props.username} isCreator />
				<div className="comment-container">
					<textarea
						onClick={this.handleClick}
						value={this.state.value}
						onChange={this.handleCommentChange}
						style={{
							height: '130px',
							width: '100%',
							border: 'none',
							padding: '1rem'
						}}
						placeholder="Leave a comment"
					/>
					<CommentFooter showCreateButton />
				</div>
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

const mapStateToProps = (state) => {
	return {
		userId: state.user.userId,
		projectId: state.project.projectId,
		teamId: state.team.teamId,
		issueId: state.issue.issueId,
		username: state.user.username
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setMessageText: (message) => dispatch(setMessageText(message)),
		closingMessageAfterOpening: () => dispatch(closingMessageAfterOpening())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateComment));
