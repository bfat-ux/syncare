import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "syncare",
    synchronize: process.env.NODE_ENV === "development",
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
});
