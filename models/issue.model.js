const mongoose = require('mongoose');
const issueTypes = require('../types/mongoose.types').issueTypes;
const statusTypes = require('../types/mongoose.types').statusTypes;
const priorityTypes = require('../types/mongoose.types').priorityTypes;

const IssueSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	summary: { type: String, required: true },
	users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
	reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: undefined, required: true },
	assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: undefined, required: false },
	description: { type: mongoose.Schema.Types.Mixed, default: '' },
	boardColumn: { type: String, required: false },
	createdBy: { type: String, required: true },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	creationDate: { type: mongoose.Schema.Types.Date, default: new Date().toISOString(), required: true },
	resolutionDate: { type: mongoose.Schema.Types.Date, default: undefined, required: false },
	dueDate: { type: Date, default: new Date().toISOString(), required: true },
	version: { type: String, default: undefined, required: true },
	votes: { type: mongoose.Schema.Types.Number, default: undefined, required: false },
	watchers: { type: mongoose.Schema.Types.Number, default: undefined, required: false },
	participants: { type: mongoose.Schema.Types.Number, default: undefined, require: false },
	numOfComments: { type: Number, default: 0 },
	status: {
		type: String,
		enum: statusTypes,
		default: 'Open'
	},
	priorityType: {
		type: String,
		enum: priorityTypes,
		default: 'High'
	},
	environment: { type: String, default: undefined, required: false },
	issueType: {
		type: String,
		enum: issueTypes,
		default: 'Bug'
	}
});

module.exports = {
	Issue: mongoose.model('Issue', IssueSchema),
	IssueSchema: IssueSchema
};
