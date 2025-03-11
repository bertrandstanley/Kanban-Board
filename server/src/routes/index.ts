// Importing necessary modules and routes
import { Router } from 'express';  // Import Router from express to create route handlers
import authRoutes from './auth-routes.js';  // Import authentication routes (e.g., login, signup)
import apiRoutes from './api/index.js';  // Import API routes for the main app functionality

// Create a new instance of the Router
const router = Router();

// Use the authentication routes when the '/auth' path is hit
router.use('/auth', authRoutes);

// Use the API routes for all endpoints starting with '/api'
router.use('/api', apiRoutes);

// Export the router so it can be used in other parts of the application
export default router;
