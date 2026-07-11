import express from 'express';
import "dotenv/config";

import router from './routes.js';

const app = express();

//express middleware
app.use(express.json());

// Routing
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});