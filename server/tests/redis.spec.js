const redisClient = require('../redis');
const jwtToken = require('../helpers/jwtToken');

const OLD_ENV = process.env;

beforeEach(() => {
	jest.resetModules(); // this is important - it clears the cache
	process.env = { ...OLD_ENV };
	delete process.env.NODE_ENV;
});

it('checks if redis set command works correctly', async (done) => {
	process.env.JWT_SECRET = 'absf%#FGG';
	const token = await jwtToken.createToken('canwork');
	console.log(token);

	redisClient.set(token, 'canwork', (err, reply) => {
		if (err) {
			console.log(err);
		}
		console.log(reply);
		done();
	});
});

afterEach(() => {
	process.env = OLD_ENV;
	redisClient.end(true);
});
