import { DataSource } from "typeorm";
import { Patient } from "../models/Patient";
import { Appointment } from "../models/Appointment";
import { Encounter } from "../models/Encounter";
import { Practitioner } from "../models/Practitioner";
import { PractitionerRole } from "../models/PractitionerRole";
import { ServiceRequest } from "../models/ServiceRequest";
import { Coverage } from "../models/Coverage";
import { Invoice } from "../models/Invoice";
import { Referral } from "../models/Referral";
import { DocumentReference } from "../models/DocumentReference";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "syncare",
    synchronize: true,
    logging: true,
    entities: [
        Patient,
        Appointment,
        Encounter,
        Practitioner,
        PractitionerRole,
        ServiceRequest,
        Coverage,
        Invoice,
        Referral,
        DocumentReference
    ],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
});

export const getConnection = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        return AppDataSource;
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        throw error;
    }
};
