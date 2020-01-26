const redis = require('redis');
const retryStrategy = require('node-redis-retry-strategy');
const keys = require('./keys');

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: retryStrategy()
});

module.exports = redisClient;
