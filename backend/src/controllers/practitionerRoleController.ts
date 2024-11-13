import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { PractitionerRole } from '../models/PractitionerRole';

export class PractitionerRoleController {
    private repository = AppDataSource.getRepository(PractitionerRole);

    async createPractitionerRole(req: Request, res: Response) {
        try {
            const role = this.repository.create(req.body);
            const savedRole = await this.repository.save(role);
            res.status(201).json(savedRole);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to create practitioner role',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getAllPractitionerRoles(req: Request, res: Response) {
        try {
            const roles = await this.repository.find({
                relations: ['practitioner']
            });
            res.json(roles);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch practitioner roles',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getPractitionerRoleById(req: Request, res: Response) {
        try {
            const role = await this.repository.findOne({
                where: { role_id: req.params.id },
                relations: ['practitioner']
            });
            
            if (!role) {
                return res.status(404).json({ error: 'Practitioner role not found' });
            }
            
            res.json(role);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch practitioner role',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async updatePractitionerRole(req: Request, res: Response) {
        try {
            const role = await this.repository.findOneBy({ role_id: req.params.id });
            
            if (!role) {
                return res.status(404).json({ error: 'Practitioner role not found' });
            }

            this.repository.merge(role, req.body);
            const updatedRole = await this.repository.save(role);
            res.json(updatedRole);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to update practitioner role',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async deletePractitionerRole(req: Request, res: Response) {
        try {
            const result = await this.repository.delete(req.params.id);
            
            if (result.affected === 0) {
                return res.status(404).json({ error: 'Practitioner role not found' });
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: 'Failed to delete practitioner role',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}