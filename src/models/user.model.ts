import { document, required, objectId, ref, getModel, defaultValue } from 'typeodm.io';
import { ObjectID } from 'bson';

@document()
export class User {
	@required() username: string;

	@required() password: string;

	@required() email: string;

	@defaultValue(false)
	isTeamAdmin: Boolean;

	githubId: string;
}

export const UserModel = getModel<User>(User);
