import { Controller, Get, Param, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	findAll(): void {}

	@Post('/signup')
	signUp(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto) {
		this.userService.signUp(userCredentialsDto);
	}

	@Post('/signin')
	signIn(@Body(ValidationPipe) UserCredentialsDto: UserCredentialsDto): Promise<{ accessToken: string }> {
		return this.userService.signIn(UserCredentialsDto);
	}

	@Post('/test')
	@UseGuards(AuthGuard())
	test(@Req() req) {
		console.log(req);
	}
}
