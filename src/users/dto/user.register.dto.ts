import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Incorrect email' })
	email: string;

	@IsString({ message: 'No password provided' })
	password: string;

	@IsString({ message: 'No name provided' })
	name: string;
}
