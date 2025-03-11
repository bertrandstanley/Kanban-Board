// seed.ts (or your seeding logic)

import { User } from '../models/user';

const seedUsers = async () => {
  try {
    // Create the first user
    const user1 = await User.create({
      username: 'JollyGuru',
      password: 'password', // Plain text password
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user1);

    // Create the second user
    const user2 = await User.create({
      username: 'SunnyScribe',
      password: 'password', // Plain text password
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user2);

    // Create the third user
    const user3 = await User.create({
      username: 'RadiantComet',
      password: 'password', // Plain text password
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user3);

    // Create the fourth user
    const user4 = await User.create({
      username: 'StanleyBertrand',
      password: 'password', // Plain text password
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user4);

  } catch (err) {
    console.error('Error seeding user:', err);
  }
};

seedUsers();