import { Request, Response } from 'express';
import { PractitionerService } from '../services/practitionerService';

// Controller now only handles HTTP concerns
export class PractitionerController {
    private service = new PractitionerService();

    async createPractitioner(req: Request, res: Response) {
        try {
            const practitioner = await this.service.create(req.body);
            res.status(201).json(practitioner);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to create practitioner',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getAllPractitioners(req: Request, res: Response) {
        try {
            const practitioners = await this.service.getAll();
            res.json(practitioners);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch practitioners',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getPractitionerById(req: Request, res: Response) {
        try {
            const practitioner = await this.service.getById(req.params.id);
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
    }

    async updatePractitioner(req: Request, res: Response) {
        try {
            const practitioner = await this.service.update(req.params.id, req.body);
            if (!practitioner) {
                return res.status(404).json({ error: 'Practitioner not found' });
            }
            res.json(practitioner);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to update practitioner',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async deletePractitioner(req: Request, res: Response) {
        try {
            const success = await this.service.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Practitioner not found' });
            }
            res.status(200).json({ message: 'Practitioner deactivated successfully' });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to delete practitioner',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}