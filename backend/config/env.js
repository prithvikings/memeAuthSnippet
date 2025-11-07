import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  REDIS_PORT: process.env.REDIS_PORT || 14787,
  REDIS_HOST: process.env.REDIS_HOST || 'redis-14787.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
  REDIS_USERNAME: process.env.REDIS_USERNAME || 'default',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '0P8xP0XbhIJBn9rrAWWpwyHRfX5LV2fm',
};
