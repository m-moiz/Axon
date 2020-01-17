const Comment = require('../models/comment.model').Comment;
const validateComment = require('../validators/validators').validateComment;

exports.getComments = (req, res) => {
	let { issueId } = req.params;

	Comment.find({ discussion_id: issueId }, (err, doc) => {
		if (err) return res.status(500).json({ error: err });
		return res.status(200).json({ comments: doc });
	});
};

exports.createComment = (req, res) => {
	const comment = new Comment();
	let { issueId, userId } = req.params;
	let { commentText } = req.body;

	let validationObject = {
		commentText
	};

	let [ isInvalid, errors ] = validateComment(objectText);

	if (isInvalid) {
		return res.status(500).json({ error: errors });
	}

	comment.discussion_id = issueId;
	comment.postedBy = userId;
	comment.text = commentText;
	comment.post_time = Date.now();

	comment
		.save()
		.then((resp) => {
			return res.status(200).json({ message: 'Comment created successfully' });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({ message: 'Failed creating comment' });
		});
};

exports.updateComment = (req, res) => {
	const { commentId } = req.params;
	let { commentText } = req.body;

	let [ isInvalid, errors ] = validateComment(objectText);

	if (isInvalid) {
		return res.status(500).json({ error: errors });
	}

	Comment.findOneAndUpdate({ _id: commentId }, { text: commentText }, (err, doc) => {
		if (err) return res.status(500).json({ message: 'Failed updating comment', error: err });
		return res.status(200).json({ message: 'Comment updated successfully' });
	});
};

exports.deleteComment = (req, res) => {
	const { commentId } = req.params;

	Comment.findByIdAndDelete({ _id: commentId }, (err, doc) => {
		if (err) return res.status(500).json({ message: 'Failed', error: err });
		return res.status(200).json({ message: 'Comment deleted successfully' });
	});
};
