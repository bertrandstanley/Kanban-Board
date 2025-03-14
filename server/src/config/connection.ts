import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

import { Sequelize } from 'sequelize';

// Create a Sequelize instance based on DB_URL or individual variables from environment
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, { dialect: 'postgres' })  // Use DB_URL directly
  : new Sequelize(
      process.env.DB_NAME || '',  // Fallback to empty string if DB_NAME is missing
      process.env.DB_USER || '',  // Fallback to empty string if DB_USER is missing
      process.env.DB_PASSWORD || '',  // Ensure DB_PASSWORD is set, fallback to empty string
      {
        host: process.env.DB_HOST || 'localhost',  // Default to 'localhost' if DB_HOST is missing
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,  // Ensure decimal numbers are handled properly
        },
      }
    );

export default sequelize;
