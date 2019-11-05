const jwtToken = require('../helpers/jwtToken');

it('checks if putTokenInDb method works correctly', async (done) => {
	jwtToken.putTokenInDb('hello', 'dude').then(() => {
		done();
	});
});
