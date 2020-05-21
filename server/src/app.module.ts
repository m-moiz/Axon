import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { IssueModule } from './issue/issue.module';
import { ProjectModule } from './project/project.module';
import { TeamModule } from './team/team.module';
import { ActivityModule } from './activity/activity.module';
import { CommentModule } from './comment/comment.module';

@Module({
	imports: [ ConfigModule.forRoot({ envFilePath: '.env' }), TypeOrmModule.forRoot(typeOrmConfig), IssueModule, ProjectModule, TeamModule, ActivityModule, CommentModule ],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
