import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

// Ensure required environment variables are present
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbUrl && (!dbName || !dbUser)) {
  throw new Error('Database configuration is incomplete. Provide DB_URL or DB_NAME and DB_USER.');
}

const sequelize = dbUrl
  ? new Sequelize(dbUrl, {
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    })
  : new Sequelize(dbName!, dbUser!, dbPassword, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Initialize models
const UserModel = UserFactory(sequelize);
const TicketModel = TicketFactory(sequelize);

// Define relationships
UserModel.hasMany(TicketModel, { foreignKey: 'assignedUserId', as: 'tickets' });
TicketModel.belongsTo(UserModel, { foreignKey: 'assignedUserId', as: 'assignedUser' });


// Export with explicit types
export { sequelize, UserModel, TicketModel };
export { User } from '../models/user.js';
export { Ticket } from '../models/ticket.js'; 


