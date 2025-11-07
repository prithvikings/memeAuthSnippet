import app from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { logger } from './config/logger.js';
import { connectRedis } from './config/redis.js'; // import redis connection function

const startServer = async () => {
  try {
    // Run MongoDB and Redis connections in parallel
    await Promise.all([
      connectDB(),
      connectRedis()
    ]);

    logger.info('✅ Databases connected (MongoDB + Redis)');

    // Start the server *after* both connections succeed
    app.listen(ENV.PORT, () => {
      logger.info(`🚀 Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
    });

  } catch (error) {
    logger.error('❌ Failed to initialize databases:', error);
    process.exit(1); // stop the process if either connection fails
  }
};

startServer();
