import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from 'src/model/user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserRepository) private userRespository: UserRepository,
		private jwtService: JwtService
	) {}

	async getUserById(id: number): Promise<User> {
		const found = await this.userRespository.findOne(id);

		if (!found) {
			throw new NotFoundException();
		}

		return found;
	}

	async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
		return this.userRespository.createUser(userCredentialsDto);
	}

	async signIn(userCredentialsDto: UserCredentialsDto): Promise<{ accessToken: string }> {
		const username = await this.userRespository.validateUserPassword(userCredentialsDto);

		if (!username) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload: JwtPayload = { username };
		const accessToken = await this.jwtService.sign(payload);

		return { accessToken };
	}
}
