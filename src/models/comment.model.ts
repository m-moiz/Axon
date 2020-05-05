import { document, required, objectId, ref, getModel } from 'typeodm.io';
import { Issue } from './issue.model';
import { ObjectID } from 'bson';

@document()
export class Comment {
	@required()
	@objectId()
	@ref(Issue)
	discussion_id: ObjectID;

	@required() post_time: number;

	@required()
	@objectId()
	@ref(User)
	postedBy: ObjectID;

	@required() nameOfPoster: string;

	@required() text: string;

	likes: number;
}

export const CommentModel = getModel<Comment>(Comment);
