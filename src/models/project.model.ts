import { document, required, objectId, ref, getModel, defaultValue } from 'typeodm.io';
import { ObjectID } from 'bson';

@document()
export class Project {
	@required() name: string;

	@objectId()
	@ref(Team)
	teamId: ObjectID;

	description: string;

	defaultValue();
	numOfIssues: number;
}

export const ProjectSchema = new mongoose.Schema({
	name: { type: String, required: true },
	teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
	projectMembers: { type: [ UserSchema ], default: undefined },
	description: { type: String },
	numOfIssues: { type: Number, default: 0 },
	issues: { type: [ IssueSchema ], default: undefined }
});

export const ProjectModel = getModel<Project>(Project);
