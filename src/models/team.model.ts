import { document, required, objectId, ref, getModel, defaultValue } from 'typeodm.io';
import { ObjectID } from 'bson';

// Important: Given the current schema design and implementation, it will take
// a team document to have ~~16 projects with each a 1000 issues to
// exceed the 16MB mongoDB document size limit. (best case scenario)

@document()
export class Team {
	@required() _id: string;

	@required() name: string;

	projects: string;
}

const TeamSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	name: { type: String, required: true },
	users: [ { type: String } ],
	projects: { type: [ ProjectSchema ], default: undefined }
});

export const TeamModel = getModel<Team>(Team);
