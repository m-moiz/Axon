import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'top',
			signOptions: {
				expiresIn: 3600
			}
		}),
		TypeOrmModule.forFeature([ UserRepository ])
	],
	controllers: [ UserController ],
	providers: [ UserService, JwtStrategy ],
	exports: [ JwtStrategy, PassportModule ]
})
export class UserModule {}
