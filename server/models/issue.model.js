const mongoose = require('mongoose');
const UserSchema = require('./user.model').UserSchema;

const IssueSchema = mongoose.Schema({
	summary: String,
	reporter: { type: UserSchema, default: '' },
	description: String,
	priorityType: {
		type: String,
		enum: [ 'High', 'Medium', 'Low', 'Lowest' ],
		default: 'High'
	},
	dueDate: { type: Date, defalt: Date.now() },
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
