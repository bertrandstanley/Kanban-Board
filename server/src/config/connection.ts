// Import the 'dotenv' package to load environment variables from a .env file
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file into process.env

// Import Sequelize to manage database connection
import { Sequelize } from 'sequelize';

// Check if DB_URL exists in the environment variables
const sequelize = process.env.DB_URL
  // If DB_URL is provided, use the entire connection string (DB_URL) to initialize Sequelize
  ? new Sequelize(process.env.DB_URL)
  // If DB_URL is not provided, fall back to using individual environment variables (DB_NAME, DB_USER, DB_PASSWORD)
  : new Sequelize(
      process.env.DB_NAME || '',          // Database name (default to an empty string if not provided)
      process.env.DB_USER || '',          // Database user (default to an empty string if not provided)
      process.env.DB_PASSWORD || '',      // Database password (default to an empty string if not provided)
      {
        host: process.env.DB_HOST || 'localhost',  // Database host, default to 'localhost' if not specified
        dialect: 'postgres',                 // Specify the dialect, which is 'postgres' in this case
        dialectOptions: {
          decimalNumbers: true,             // Ensure that numbers are returned as decimals, useful for floating point numbers
        },
      }
    );

// Export the Sequelize instance to be used in other parts of the application
export default sequelize;
