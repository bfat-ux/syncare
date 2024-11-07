import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error);
    });

// Basic health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
