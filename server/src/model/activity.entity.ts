import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Activity extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() activity_time: number;

	@Column() activityBy: string;

	@Column() activity: string;
}
