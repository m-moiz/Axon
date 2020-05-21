import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Unique } from 'typeorm';
import { Comment } from './comment.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique([ 'username' ])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() username: string;

	@Column() password: string;

	@Column() salt: string;

	@Column() email: string;

	@Column() isTeamAdmin: boolean;

	@Column() githubId: string;

	@OneToMany((type) => Comment, (comment) => comment.postedBy)
	comments: Comment;

	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash === this.password;
	}
}
