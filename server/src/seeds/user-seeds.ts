// seed.ts (or your seeding logic)

import { User } from '../models/user';

const seedUser = async () => {
  try {
    const user = await User.create({
      username: 'RadiantComet',
      password: 'password', // Plain text password
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('User seeded:', user);
  } catch (err) {
    console.error('Error seeding user:', err);
  }
};

seedUser();
