import { NextFunction } from 'C:/Users/hp-/AppData/Local/Microsoft/TypeScript/3.8/node_modules/@types/express';

const redisClient = require('../helpers/jwtToken').redisClient;

exports.requireAuth = (req: Request, res: Response, next: NextFunction) => {
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
