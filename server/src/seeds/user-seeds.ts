import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password', createdAt: new Date(), updatedAt: new Date() },
    { username: 'SunnyScribe', password: 'password', createdAt: new Date(), updatedAt: new Date() },
    { username: 'RadiantComet', password: 'password', createdAt: new Date(), updatedAt: new Date() },
  ], { individualHooks: true });
};
