const jwtToken = require('../helpers/jwtToken');
const redisClient = require('../redis');

const OLD_ENV = process.env;

beforeEach(() => {
	jest.resetModules(); // this is important - it clears the cache
	process.env = { ...OLD_ENV };
	delete process.env.NODE_ENV;
});

afterEach(() => {
	process.env = OLD_ENV;
});

it('creates a new jwt token', () => {
	process.env.NODE_ENV = 'dev';
	process.env.JWT_SECRET = 'shgh@$^&%$$^n';
	expect(jwtToken.createToken({ username: 'a' })).toBeDefined();
});

it('puts token into redis database', () => {
	expect.assertions(1);
	return jwtToken.putTokenInDb('a&87', { dog: 'dog' }).then((data) => {
		console.log(data);
		expect(data).toBeFalsy();
	});
});

it('checks if the token is in redis database', () => {});
