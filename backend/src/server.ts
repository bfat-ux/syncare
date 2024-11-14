import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import app from './app';
import "reflect-metadata";

dotenv.config();

const port = process.env.PORT || 3000;

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Error during server startup:", error);
        process.exit(1);
    }
};

startServer();
