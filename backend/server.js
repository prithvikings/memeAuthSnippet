import app from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { logger } from './config/logger.js';

// Connect to MongoDB
connectDB()

// Start server
app.listen(ENV.PORT, () => {
  logger.info(`🚀 Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});
