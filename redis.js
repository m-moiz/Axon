const Redis = require('ioredis');
const retryStrategy = require('node-redis-retry-strategy');

let redisClient = null;

if (process.env.NODE_ENV === 'production') {
	redisClient = Redis.createClient({
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD,
		retry_strategy: retryStrategy()
	});
} else {
	redisClient = Redis.createClient();
}

module.exports = redisClient;

