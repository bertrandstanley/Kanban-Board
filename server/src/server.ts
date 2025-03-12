import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import routes from './routes/index.js';
import sequelize from './config/connection.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const root = process.cwd();

// Get the current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

// Middleware to parse incoming requests
app.use(express.json());
app.use(routes);

// Wild card route to serve the index.html file
app.get('*', (_req, res) => {
    res.sendFile(path.join(root, '../client/dist/index.html'));
});

// * Change force to true to drop tables and recreate them
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
