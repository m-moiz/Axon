const Activity = require('../models/activity.model').Activity;

exports.getActivity = (req, res) => {
	let { issueId } = req.params;

	Activity.find({ discussion_id: issueId }, (err, doc) => {
		if (err) return res.status(500).json({ error: err });
		return res.status(200).json({ activity: doc });
	});
};

exports.createActivity = (req, res) => {
	const Activity = new Activity();
	let { issueId, username, activity } = req.params;
	let { commentText } = req.body;

	validateComment(commentText);

	Activity.discussion_id = issueId;
	Acitivity.activityBy = username;
	Activity.activity = activity;
	Activity.activity_time = Date.now();

	Activity.save()
		.then((resp) => {
			return res.status(200).json({ message: 'Activity created successfully' });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({ message: 'Failed creating activity' });
		});
};
