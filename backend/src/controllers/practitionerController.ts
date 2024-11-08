import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Practitioner } from '../models/Practitioner';

export const createPractitioner = async (req: Request, res: Response) => {
    try {
        const practitionerRepository = AppDataSource.getRepository(Practitioner);
        const practitioner = practitionerRepository.create(req.body);
        const savedPractitioner = await practitionerRepository.save(practitioner);
        res.status(201).json(savedPractitioner);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create practitioner',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Add other CRUD operations