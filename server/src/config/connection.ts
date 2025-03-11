import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost', // Use DB_HOST from env, or default to 'localhost'
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Use DB_PORT from env, or default to 5432
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

export default sequelize;
