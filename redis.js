const Redis = require('ioredis');
const fs = require('fs');
const retryStrategy = require('node-redis-retry-strategy');

let redisClient = null;

if (process.env.NODE_ENV === 'production') {
	redisClient = new Redis();
} else {
	redisClient = new Redis();
}

module.exports = redisClient;

