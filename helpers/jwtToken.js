const jwt = require('jsonwebtoken');
const redisClient = require('../redis');

const jwtToken = {
	putTokenInDb(token, username, db) {
		db.set(token, username);
	},

	removeTokenFromDb(token, db) {
		db.del(token, (err) => {
			if (err) console.log(err);
		});
	},

	createToken(username) {
		const jwtPayload = { username };
		return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1 days' });
	},

	checkTokenInDb(req, res, db) {
		const { token } = req.headers;
		return db.get(token, (err, reply) => {
			if (err || !reply) {
				return res.status(401).status({ message: 'Unauthorized!' });
			} else {
				return res.status(200).json({ username: reply, message: 'Success!' });
			}
		});
	},

	createSession(user) {
		const { username } = user;
		const token = this.createToken(username);
		this.putTokenInDb(token, username, redisClient);
		return token;
	}
};

module.exports = {
	jwtToken
};
