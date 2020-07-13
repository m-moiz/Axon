const redis = require('redis');
const retryStrategy = require('node-redis-retry-strategy');

let redisClient = null;

if (process.env.NODE_ENV === 'production') {
	redisClient = redis.createClient({
		url: process.env.REDIS_URL,
		retry_strategy: retryStrategy()
	});
} else {
	redisClient = redis.createClient();
}

module.exports = redisClient;
