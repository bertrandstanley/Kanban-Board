import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js'; // 

// Create a new router instance
const router = Router();

// login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  // Extract username and password from request body
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username, password);

  try {
    // Find user in the database by username
    const user = await User.findOne({ where: { username } });

    // If user is not found, send response
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Setting Up Password
    if (password !== user.password) {
      // If passwords don't match, send response
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Get secret key from .env
    const secretKey = process.env.JWT_SECRET_KEY || '';
    // Generate JWT token for the authenticated user
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1d' });

    // Return the token and the user's ID
    return res.json({ token, userID: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: 'Internal server error during login' });
  }
};

// POST /login - Login a user
router.post('/login', login);

export default router; // Export the router instance
