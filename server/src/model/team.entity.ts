import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Team extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() name: string;

	@OneToMany((type) => Project, (project) => project.team)
	projects: Project[];
}
