import { Router } from 'express';

const authController = Router();

authController.post('/login', (req, res) => {
  // Handle login logic here
  res.send('Login endpoint');
});

authController.post('/register', (req, res) => {
  // Handle registration logic here
  res.send('Register endpoint');
});

export default authController;