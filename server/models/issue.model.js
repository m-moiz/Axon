const mongoose = require('mongoose');
const UserSchema = require('./user.model').UserSchema;

const IssueSchema = mongoose.Schema({
	summary: { type: String, required: true },
	reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: undefined, required: true },
	assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: undefined, required: false },
	description: { type: String, required: true },
	creationDate: { type: mongoose.Schema.Types.Date, default: Date.now(), required: true },
	resolutionDate: { type: mongoose.Schema.Types.Date, default: undefined, required: false },
	dueDate: { type: Date, default: Date.now(), required: true },
	version: { type: String, default: undefined, required: true },
	votes: { type: mongoose.Schema.Types.Number, default: undefined, required: false },
	watchers: { type: mongoose.Schema.Types.Number, default: undefined, required: false },
	participants: { type: mongoose.Schema.Types.Number, default: undefined, require: false },
	status: {
		type: String,
		enum: [ 'Open', 'Closed' ],
		default: 'Open'
	},
	priorityType: {
		type: String,
		enum: [ 'High', 'Medium', 'Low', 'Lowest' ],
		default: 'High'
	},
	environment: String,
	issueType: {
		type: String,
		enum: [ 'Bug', 'Improvement', 'Task', 'Feature', 'Epic' ],
		default: 'Bug'
	}
});

module.exports = {
	Issue: mongoose.model('Issue', IssueSchema),
	IssueSchema: IssueSchema
};
