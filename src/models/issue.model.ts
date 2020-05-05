import { document, required, objectId, ref, getModel, defaultValue } from 'typeodm.io';
import { ObjectID } from 'bson';

@document()
export class Issue {
	@required() summary: string;

	@required()
	@objectId()
	@ref(User)
	reporter: ObjectID;

	@objectId()
	@ref(User)
	assignee: ObjectID;

	description: string;

	boardColumn: string;

	@required() creationDate: number;

	resolutionDate: string;

	dueDate: string;

	version: string;

	votes: number;

	watchers: number;

	participants: number;

	@defaultValue(0)
	numOfComments: number;

	status: string;

	issueType: string;

	priorityType: string;

	environment: string;
}

export const IssueModel = getModel<Issue>(Issue);
