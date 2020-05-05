import { document, required, objectId, ref, getModel } from 'typeodm.io';
import { Issue } from './issue.model';
import { ObjectID } from 'bson';

@document()
export class Activity {
	@required()
	@objectId()
	@ref(Issue)
	discussion_id: ObjectID;

	@required() activity_time: number;

	@required() activityBy: string;

	@required() activity: string;
}

export const ActivityModel = getModel<Activity>(Activity);
