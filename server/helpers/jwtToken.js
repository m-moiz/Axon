const jwt = require('jsonwebtoken');
const redisClient = require('../redis');

const jwtToken = {
	async putTokenInDb(token, username) {
		redisClient.set(token, username, (err, reply) => {
			return new Promise((resolve, reject) => {
				if (err) {
					reject(err);
				}

				resolve(true);
			});
		});
	},

	async createToken(username) {
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

	async createSessions(user, res) {
		const { username } = user;
		const { _id, teams, isTeamAdmin } = user;
		const token = await this.createToken(username);
		return this.putTokenInDb(token, username)
			.then(() =>
				res.json({
					success: 'true',
					username: username,
					userId: _id,
					teams: teams,
					token: token,
					isTeamAdmin: isTeamAdmin
				})
			)
			.catch((err) => console.log(err));
	}
};

module.exports = jwtToken;
