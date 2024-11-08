import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { PractitionerRole } from '../models/PractitionerRole';

export const createPractitionerRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const roleRepository = AppDataSource.getRepository(PractitionerRole);
        const role = roleRepository.create(req.body);
        const savedRole = await roleRepository.save(role);
        res.status(201).json(savedRole);
    } catch (error) {
        console.error('Error in createPractitionerRole:', error);
        res.status(500).json({
            error: 'Failed to create practitioner role',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getPractitionerRolesByPractitioner = async (req: Request, res: Response): Promise<void> => {
    try {
        const roleRepository = AppDataSource.getRepository(PractitionerRole);
        const roles = await roleRepository.find({
            where: { practitioner_id: req.params.practitionerId },
            relations: ['practitioner']
        });
        res.json(roles);
    } catch (error) {
        console.error('Error in getPractitionerRolesByPractitioner:', error);
        res.status(500).json({
            error: 'Failed to fetch practitioner roles',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const updatePractitionerRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const roleRepository = AppDataSource.getRepository(PractitionerRole);
        const role = await roleRepository.findOneBy({ role_id: req.params.id });
        
        if (!role) {
            res.status(404).json({ error: 'Practitioner role not found' });
            return;
        }
        
        roleRepository.merge(role, req.body);
        const updatedRole = await roleRepository.save(role);
        res.json(updatedRole);
    } catch (error) {
        console.error('Error in updatePractitionerRole:', error);
        res.status(500).json({
            error: 'Failed to update practitioner role',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};