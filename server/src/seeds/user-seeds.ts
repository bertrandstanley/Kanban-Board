import sequelize from '../config/connection.js';
import { UserFactory } from '../models/user.js';

const seedUsers = async () => {
  try {
    const User = UserFactory(sequelize);

    // Sync the database, creating the table if it doesn’t exist
    await sequelize.sync({ force: false });  // Make sure the table is created if it doesn't exist
    console.log('Database synced, users table created (if not already existing)');

    // Seed users with plain text passwords 
    const user1 = await User.create({
      username: 'JollyGuru',
      password: 'password',  
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user1.username);

    const user2 = await User.create({
      username: 'SunnyScribe',
      password: 'password',  
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user2.username);

    const user3 = await User.create({
      username: 'RadiantComet',
      password: 'password',  
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user3.username);

    const user4 = await User.create({
      username: 'StanleyBertrand',
      password: 'password', 
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user4.username);

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding users:', err);
  } finally {
    await sequelize.close();  // Close the connection when done
  }
};

// Execute the seeding function
seedUsers();
