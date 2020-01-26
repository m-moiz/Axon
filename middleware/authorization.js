exports.requireAuth = (req, res, next, redisClient) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	return redisClient.get(authorization, (err, reply) => {
		if (err || !reply) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		return next;
	});
};
