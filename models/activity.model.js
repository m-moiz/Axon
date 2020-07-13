const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	discussion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
	activity_time: mongoose.Schema.Types.Date,
	activityBy: {
		type: String,
		required: true
	},
	activity: { type: String, required: true }
});

module.exports = {
	Activity: mongoose.model('Activity', ActivitySchema)
};
