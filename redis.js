const redis = require('redis');
const retryStrategy = require('node-redis-retry-strategy');

const redisClient = redis.createClient({
	url: process.env.REDIS_URL,
	retry_strategy: retryStrategy()
});

module.exports = redisClient;
