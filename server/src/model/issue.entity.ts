import { Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToMany, BaseEntity } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Issue extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() summary: string;

	@Column('text') description: Text;

	@Column() boardColumn: string;

	@Column('timestamp') creationDate: Timestamp;

	@Column('timestamp') resolutionDate: Timestamp;

	@Column('timestamp') dueDate: Timestamp;

	@OneToMany((type) => Comment, (comment) => comment.issue)
	comments: Comment;

	@Column() version: string;

	@Column() votes: number;

	@Column() watchers: number;

	@Column() participants: number;

	@Column() status: StatusTypes;

	@Column() issueType: IssueTypes;

	@Column() priorityType: PriorityTypes;

	@Column() environment: string;
}
