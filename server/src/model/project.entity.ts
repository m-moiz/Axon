import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Team } from './team.entity';
@Entity()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@ManyToOne((type) => Team, (team) => team.projects)
	team: Team;

	@Column() description: string;

	@Column() numOfIssues: number;
}
