import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Issue } from './issue.entity';

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@ManyToOne((type) => User, (user) => user.comments)
	postedBy: User;

	@Column('text') text: Text;

	@Column() likes: number;

	@ManyToOne((type) => Issue, (issue) => issue.comments)
	issue: Issue;
}
