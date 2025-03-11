import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js'; // Ensure .js extension for TypeScript

interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId: number | null; // Allow null explicitly
  createdAt: Date;
  updatedAt: Date;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number | null; // Match allowNull: true

  // Associated User model
  public readonly assignedUser?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function TicketFactory(sequelize: Sequelize): typeof Ticket {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users', // Table name, not model name
          key: 'id',
        },
        onDelete: 'SET NULL', // Match your seed output
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'tickets',
      sequelize,
      timestamps: true, // Explicitly enable timestamps
    }
  );

  return Ticket;
}

// Export type for TypeScript usage
export type TicketType = Ticket;