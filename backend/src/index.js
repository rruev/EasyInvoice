import express from 'express';
import "dotenv/config";
import cookieParser from 'cookie-parser';

import router from './routes.js';
import { authMiddleware } from './middleware/auth.middleware.js';

const app = express();

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