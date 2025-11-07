// config/redis.js
import { createClient } from 'redis';
import { ENV } from './env.js';

export const redisClient = createClient({
  username: ENV.REDIS_USERNAME,
  password: ENV.REDIS_PASSWORD,
  socket: {
    host: ENV.REDIS_HOST,
    port: ENV.REDIS_PORT
  }
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('✅ Connected to Redis');
  } catch (err) {
    console.error('❌ Redis connection error:', err);
    throw err; // rethrow so Promise.all can catch it
  }
};
