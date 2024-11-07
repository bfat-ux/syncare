import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { getConnection } from './config/database';
import patientRoutes from './routes/patientRoutes';
import "reflect-metadata";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Add a default route for the root path
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        message: 'Welcome to SynCare API',
        endpoints: {
            health: '/health',
            patients: '/api/patients'
        }
    });
});

// Health check route
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

const startServer = async () => {
    try {
        // Initialize database connection first
        await getConnection();
        
        // Register routes
        app.use('/api', patientRoutes);
        
        // Start server
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
