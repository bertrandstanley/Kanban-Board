// server/models/user.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string; // Plain text password
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // No need for bcrypt logic, password is stored as plain text.
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Prevent duplicate usernames
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Store the plain text password
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
      tableName: 'users',
      sequelize,
      timestamps: true, // Enable timestamps
      hooks: {
        // Before creating a user, no hashing required
        beforeCreate: async () => {
          // You can add any additional logic before user creation if needed
        },
        // Before updating the user, no hashing required
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            // You can add any additional logic here if needed
          }
        },
      },
    }
  );

  return User;
}
