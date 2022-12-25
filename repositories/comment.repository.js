const Comment = require('../models/comment.model').Comment;
const Team = require('../models/team.model').Team;

const CommentRepository = {
	async add(fields) {
		const comment = new Comment();
		comment._id = fields.id;
		comment.discussion_id = fields.issueId;
		comment.nameOfPoster = fields.username;
		comment.postedBy = fields.userId;
		comment.text = fields.commentText;
		comment.post_time = new Date().toISOString();
		await comment.save();
	},

	async get() {},

	async getAllInIssue(id) {
		return await Comment.find({ discussion_id: id });
	},

	async delete(id) {
		await Comment.findByIdAndDelete({ _id: id });
	},

	async update(id, text) {
		await Comment.findOneAndUpdate({ _id: id }, { text: text });
	},

	async updateNumOfComments(issueId) {
		await Issue.findByIdAndUpdate(issueId, {
		  $inc: { numOfComments: 1 }
		});
	  }
};

module.exports = CommentRepository;
