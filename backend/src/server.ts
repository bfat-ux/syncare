import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import patientRoutes from './routes/patientRoutes';
import "reflect-metadata";
import { prettyJson } from './middleware/prettyJson';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(prettyJson);

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes
app.use('/api', patientRoutes);

// Health check route
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const startServer = async () => {
    try {
        // Initialize database connection
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        // Start server with error handling
        const server = app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });

        server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`⚠️ Port ${port} is already in use`);
                // Try the next port
                server.listen(Number(port) + 1);
            } else {
                console.error('Server error:', error);
            }
        });

    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1);
    }
};

startServer();
