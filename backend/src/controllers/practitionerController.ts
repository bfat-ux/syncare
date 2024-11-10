import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Practitioner } from '../models/Practitioner';

// Create practitioner (already exists)
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

// Get all practitioners
export const getAllPractitioners = async (req: Request, res: Response) => {
    try {
        const practitionerRepository = AppDataSource.getRepository(Practitioner);
        const practitioners = await practitionerRepository.find();
        res.json(practitioners);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch practitioners',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get practitioner by ID
export const getPractitionerById = async (req: Request, res: Response) => {
    try {
        const practitionerRepository = AppDataSource.getRepository(Practitioner);
        const practitioner = await practitionerRepository.findOneBy({ 
            practitioner_id: req.params.id 
        });
        
        if (!practitioner) {
            return res.status(404).json({ error: 'Practitioner not found' });
        }
        
        res.json(practitioner);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch practitioner',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Update practitioner
export const updatePractitioner = async (req: Request, res: Response) => {
    try {
        const practitionerRepository = AppDataSource.getRepository(Practitioner);
        const practitioner = await practitionerRepository.findOneBy({ 
            practitioner_id: req.params.id 
        });
        
        if (!practitioner) {
            return res.status(404).json({ error: 'Practitioner not found' });
        }
        
        practitionerRepository.merge(practitioner, req.body);
        const updatedPractitioner = await practitionerRepository.save(practitioner);
        res.json(updatedPractitioner);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to update practitioner',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Delete practitioner (soft delete)
export const deletePractitioner = async (req: Request, res: Response) => {
    try {
        const practitionerRepository = AppDataSource.getRepository(Practitioner);
        const practitioner = await practitionerRepository.findOneBy({ 
            practitioner_id: req.params.id 
        });
        
        if (!practitioner) {
            return res.status(404).json({ error: 'Practitioner not found' });
        }
        
        // Now this will work since we've added the isActive field
        practitioner.isActive = false;
        await practitionerRepository.save(practitioner);
        
        res.status(200).json({ message: 'Practitioner deactivated successfully' });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete practitioner',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};