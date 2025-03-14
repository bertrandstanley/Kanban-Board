import { Request, Response } from 'express';
import { User } from '../models/user.js'; // Import the User model

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database by their username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password entered by the user matches the stored plain text password
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }


        return res.status(200).json({
            message: 'Login successful',
            user, // Or you can return a token instead of user details
            // token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /Users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Users
export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      password, // Store plain text password directly
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password; // Set the new plain text password
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
