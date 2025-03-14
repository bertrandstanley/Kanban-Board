import { Ticket } from '../models/ticket.js';
import { User } from '../models/user.js';

export const seedTickets = async (users: User[]): Promise<void> => {
  // Define an array of ticket objects to be seeded
  const tickets = [
    {
      name: 'Design landing page',
      status: 'In Progress',
      description: 'Create wireframes and mockups for the landing page.',
      assignedUserId: users[0].id, 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Set up project repository',
      status: 'Done',
      description: 'Create a new repository on GitHub and initialize it with a README file.',
      assignedUserId: users[1].id, 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Implement authentication',
      status: 'Todo',
      description: 'Set up user authentication using JWT tokens.',
      assignedUserId: users[0].id, 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Test the API',
      status: 'Todo',
      description: 'Test the API using Insomnia.',
      assignedUserId: users[0].id, 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Deploy to production',
      status: 'Todo',
      description: 'Deploy the application to Render.',
      assignedUserId: users[1].id, 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Bulk insert the tickets into the database with validation
  await Ticket.bulkCreate(tickets, { validate: true });

  // Log a message to confirm that tickets have been seeded
  console.log('Tickets have been seeded');
};
