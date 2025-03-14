import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });  // Load environment variables from .env file in the server folder

import { Sequelize } from 'sequelize';

// Check if necessary environment variables are set
if (!process.env.DB_URL && (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST)) {
  throw new Error('Missing database connection details in environment variables');
}

// Create a Sequelize instance based on DB_URL or individual variables from environment
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, { 
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,  // Ensure decimal numbers are handled properly
      },
    })  // Use DB_URL directly if provided
  : new Sequelize(
      process.env.DB_NAME as string,  // Fallback to empty string if DB_NAME is missing
      process.env.DB_USER as string,  // Fallback to empty string if DB_USER is missing
      process.env.DB_PASSWORD as string,  // Ensure DB_PASSWORD is set, fallback to empty string
      {
        host: process.env.DB_HOST || 'localhost',  // Default to 'localhost' if DB_HOST is missing
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,  // Default to 5432 if DB_PORT is missing
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,  // Ensure decimal numbers are handled properly
        },
      }
    );

// Ensure that the connection is successful before continuing
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if the connection fails
  });

// Sync the database (creates tables if they don't exist)
sequelize.sync({ force: false })  // 'force: false' means it won't drop existing tables
  .then(() => {
    console.log('Database synced successfully!');
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
    process.exit(1); // Exit the process if sync fails
  });

export default sequelize;