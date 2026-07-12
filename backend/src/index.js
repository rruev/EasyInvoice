import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes.js';
import { authMiddleware } from './middleware/auth.middleware.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

//express middleware
app.use(express.json());

//middleware external
app.use(cookieParser());

//middleware internal
app.use(authMiddleware);

// Routing
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});