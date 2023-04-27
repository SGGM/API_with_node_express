import request from 'supertest';
import { App } from '../src/app';
import { boot } from '../src/main';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e test', () => {
	it('Register - error', async () => {
		const result = await request(application.app)
			.post('/users/register')
			.send({ email: 'a@a.ru', password: '1' });
		expect(result.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'a2@mail.ru', password: 'superpass' });
		expect(result.body.jwt).not.toBeUndefined();
	});

	it('Login - error', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'a2@mail.ru', password: 'wrongpassword' });
		expect(result.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'a2@mail.ru', password: 'superpass' });
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(result.body.email).toBe('a2@mail.ru');
	});

	it('Info - error', async () => {
		const result = await request(application.app).get('/users/info').set('Authorization', `1`);
		expect(result.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
