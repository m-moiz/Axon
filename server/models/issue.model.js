const mongoose = require('mongoose');
const UserSchema = require('./user.model').UserSchema;

const IssueSchema = mongoose.Schema({
	summary: { type: String, required: true },
	reporter: { type: UserSchema, default: undefined, required: true },
	description: { type: String, required: true },
	priorityType: {
		type: String,
		enum: [ 'High', 'Medium', 'Low', 'Lowest' ],
		default: 'High'
	},
	dueDate: { type: Date, default: Date.now(), required: true },
	environment: String,
	issueType: {
		type: String,
		enum: [ 'Bug', 'Improvement', 'Task', 'Feature', 'Epic' ],
		default: 'Improvement'
	}
});

module.exports = {
	Issue: mongoose.model('Issue', IssueSchema),
	IssueSchema: IssueSchema
};
