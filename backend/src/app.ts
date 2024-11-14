import express, { Express, Request, Response, NextFunction } from 'express';
import routes from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import { prettyJson } from './middleware/prettyJson';

const app: Express = express();

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
app.use('/api', routes);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error caught in global handler:', err);
    errorHandler(err, req, res, next);
});

export default app;
