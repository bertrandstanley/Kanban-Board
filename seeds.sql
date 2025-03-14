-- Drop the users table if it exists
DROP TABLE IF EXISTS "users";

-- Create the users table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert the seeded users
INSERT INTO "users" ("username", "password", "createdAt", "updatedAt")
VALUES
  ('JollyGuru', 'password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('SunnyScribe', 'password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('RadiantComet', 'password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('StanleyBertrand', 'password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Optionally, you can add a query to verify if users were inserted:
SELECT * FROM "users";

-- Drop the tickets table if it exists
DROP TABLE IF EXISTS "tickets";

-- Create the tickets table
CREATE TABLE "tickets" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "status" VARCHAR(50) NOT NULL,
  "description" TEXT NOT NULL,
  "assignedUserId" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,  -- Foreign key to users table
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert the seeded tickets
INSERT INTO "tickets" ("name", "status", "description", "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('Design landing page', 'In Progress', 'Create wireframes and mockups for the landing page.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- Assigned to JollyGuru (User ID 1)
  ('Set up project repository', 'Done', 'Create a new repository on GitHub and initialize it with a README file.', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- Assigned to SunnyScribe (User ID 2)
  ('Implement authentication', 'Todo', 'Set up user authentication using JWT tokens.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- Assigned to JollyGuru (User ID 1)
  ('Test the API', 'Todo', 'Test the API using Insomnia.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),  -- Assigned to JollyGuru (User ID 1)
  ('Deploy to production', 'Todo', 'Deploy the application to Render.', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);  -- Assigned to SunnyScribe (User ID 2)

-- Optionally, you can add a query to verify if tickets were inserted:
SELECT * FROM "tickets";
