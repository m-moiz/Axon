const Comment = require('../models/comment.model').Comment;
const Team = require('../models/team.model').Team;
const validateComment = require('../validators/validators').validateComment;

const incNumOfComments = (teamId, projectId, issueId) => {
	Team.findOneAndUpdate(
		{ _id: teamId },
		{
			$inc: {
				'projects.$[i].issues.$[j].numOfComments': 1
			}
		},
		{
			arrayFilters: [ { 'i._id': projectId }, { 'j._id': issueId } ]
		}
	)
		.then(() => {})
		.catch((err) => {
			console.log(err);
			return res.status(500).json('Failed');
		});
};

exports.getComments = (req: Request, res: Response) => {
	let { issueId } = req.params;

	Comment.find({ discussion_id: issueId }, (err, doc) => {
		if (err) return res.status(500).json({ error: err });
		return res.status(200).json({ comments: doc });
	});
};

exports.createComment = (req: Request, res: Response) => {
	const comment = new Comment();
	let { issueId, userId } = req.params;
	let { commentText, username, projectId, teamId } = req.body;

	let validationObject = {
		commentText
	};

	let [ isInvalid, errors ] = validateComment(validationObject);

	if (isInvalid) {
		return res.status(500).json({ error: errors });
	}

	comment.discussion_id = issueId;
	comment.nameOfPoster = username;
	comment.postedBy = userId;
	comment.text = commentText;
	comment.post_time = Date.now();

	comment
		.save()
		.then(() => {
			return res.status(200).json({ message: 'Comment created successfully' });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({ message: 'Failed creating comment' });
		});

	incNumOfComments(teamId, projectId, issueId);
};

exports.updateComment = (req: Request, res: Response) => {
	const { commentId } = req.params;
	let { commentText } = req.body;

	let [ isInvalid, errors ] = validateComment(objectText);

	if (isInvalid) {
		return res.status(500).json({ error: errors });
	}

	Comment.findOneAndUpdate({ _id: commentId }, { text: commentText }, (err) => {
		if (err) return res.status(500).json({ message: 'Failed updating comment', error: err });
		return res.status(200).json({ message: 'Comment updated successfully' });
	});
};

exports.deleteComment = (req: Request, res: Response) => {
	const { commentId } = req.params;

	Comment.findByIdAndDelete({ _id: commentId }, (err) => {
		if (err) return res.status(500).json({ message: 'Failed', error: err });
		return res.status(200).json({ message: 'Comment deleted successfully' });
	});
};
