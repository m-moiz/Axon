const redisClient = require('../helpers/jwtToken').redisClient;

exports.requireAuth = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	return redisClient.get(authorization, (err, reply) => {
		if (err || !reply) {
			console.log(err);
			return res.status(401).json({ message: 'Unauthorized' });
		}

		next();
	});
};
