const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
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
