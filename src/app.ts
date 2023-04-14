import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;
	userController: UserController;
	exeptionFilter: ExeptionFilter;

	constructor(
		logger: LoggerService,
		UserController: UserController,
		exeptionFilter: ExeptionFilter
	) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = UserController;
		this.exeptionFilter = exeptionFilter;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init() {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server runs on http://localhost:${this.port}`);		
	}
}