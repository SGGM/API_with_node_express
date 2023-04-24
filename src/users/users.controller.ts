import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IUserConteroller } from './users.controller.intrface';
import 'reflect-metadata';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';

@injectable()
export class UserController extends BaseController implements IUserConteroller {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		this.ok(res, 'login');
	}

	register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
