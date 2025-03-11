// Import necessary dependencies
import { User } from '../models/user.js';  // Ensure correct path to your model
import sequelize from '../config/connection.js';

const seedUsers = async () => {
  try {
    // Example users for seeding
    const users = [
      { username: 'stanley', password: 'password123' },
      { username: 'JollyGuru', password: 'password' },
      { username: 'admin', password: 'admin123' }
    ];

    // Create users in the database
    for (const user of users) {
      await User.create({
        username: user.username,
        password: user.password, // Make sure this is a hashed password if you have hashing in place
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedAll = async (): Promise<void> => {
  try {
    // Sync the database (drop tables if needed and recreate them)
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    // Seed users
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit the process with an error code
  }
};

// Run the seeding process
seedAll();
