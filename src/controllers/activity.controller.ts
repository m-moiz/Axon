import { Activity, ActivityModel } from '../models/activity.model';
import { Request, response } from 'express';
import { ObjectID } from 'bson';

interface RequestWithParams extends Request {
	issueId: ObjectID;
	username?: string;
	activity?: string;
}

exports.getActivity = (req: RequestWithParams, res: Response) => {
	let { issueId } = req.params;

	ActivityModel.find({ discussion_id: issueId }, (err, doc) => {
		if (err) return response.sendStatus(HTTPStatusCodes.NOT_FOUND).json({ error: err });

		return response.sendStatus(HTTPStatusCodes.OK).json({ activity: doc });
	});
};

exports.createActivity = (req: RequestWithParams, res: Response) => {
	const Activity = new ActivityModel();
	let { issueId, username, activity } = req.params;
	let { commentText } = req.body;

	validateComment(commentText);

	Activity.discussion_id = issueId;
	Activity.activityBy = username;
	Activity.activity = activity;
	Activity.activity_time = Date.now();

	Activity.save()
		.then((resp) => {
			return response.sendStatus(HTTPStatusCodes.OK).json({ message: 'Activity created successfully' });
		})
		.catch((err) => {
			console.log(err);
			return response
				.sendStatus(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Failed creating activity' });
		});
};
