const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
	discussion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
	post_time: mongoose.Schema.Types.Date,
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	text: { type: String, required: true }
});

module.exports = {
	Comment: mongoose.model('Comment', CommentSchema)
};
