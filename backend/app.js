import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware.js';
import userRouter from './routes/user.router.js';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.js';

const app = express();


// Middleware
app.use(helmet()); // Security headers middleware
app.use(cors({
  origin: ENV.FRONTEND_URL, // Adjust as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})); 
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies


// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

app.use('/api/users', userRouter);

// Error handler
app.use(errorHandler);

export default app;
