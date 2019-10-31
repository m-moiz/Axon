const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient();

const jwtToken = {
	putTokenInDb(token, username) {
		return Promise.resolve(redisClient.set((token, username, 0)));
	},

	createToken(username) {
		const jwtPayload = { username };
		return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1 days' });
	},

	checkTokenInDb(req, res) {
		const { token } = req.headers;
		return redisClient.get(token, (err, reply) => {
			if (err || !reply) {
				return res.status(401).status({ message: 'Unauthorized!' });
			} else {
				return res.status(200).json({ username: reply, message: 'Success!' });
			}
		});
	},

	createSessions(user, res) {
		const { username } = user;
		const token = this.createToken(username);
		return this.putTokenInDb(token, username)
			.then(() => res.json({ success: 'true', username: username, token: token }))
			.catch((err) => console.log(err));
	}
};

module.exports = jwtToken;
