-- Ensure that the table exists before inserting (adjust as necessary)
CREATE TABLE IF NOT EXISTS "users" (
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
