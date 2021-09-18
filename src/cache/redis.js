const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
})
console.log('RedisDB Connected');
module.exports = client;