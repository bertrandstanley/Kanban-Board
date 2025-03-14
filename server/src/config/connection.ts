import dotenv from 'dotenv';  // Import dotenv to load environment variables
dotenv.config();  // Load environment variables from .env file

import { Sequelize } from 'sequelize';  // Import Sequelize for database connection

// Create a new Sequelize instance depending on the availability of DB_URL
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)  // Use DB_URL from environment variables
  : new Sequelize(
      process.env.DB_NAME || '',  // Use DB_NAME from environment variables, fallback to empty string
      process.env.DB_USER || '',  // Use DB_USER from environment variables, fallback to empty string
      process.env.DB_PASSWORD,  // Use DB_PASSWORD from environment variables
      {
        host: 'localhost',  // Default to 'localhost' if no host is provided
        dialect: 'postgres',  // Set the database dialect to PostgreSQL
        dialectOptions: {
          decimalNumbers: true,  // Enable decimal numbers in query results
        },
      }
    );

export default sequelize;  // Export the sequelize instance for use in other parts of the application
