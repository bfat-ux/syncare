import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { DocumentReference } from '../models/DocumentReference';

export class DocumentReferenceController {
    private repository = AppDataSource.getRepository(DocumentReference);

    async createDocumentReference(req: Request, res: Response) {
        try {
            const document = this.repository.create({
                ...req.body,
                document_date: new Date(req.body.document_date || new Date())
            });
            const savedDocument = await this.repository.save(document);
            res.status(201).json(savedDocument);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to create document reference',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getAllDocumentReferences(req: Request, res: Response) {
        try {
            const documents = await this.repository.find({
                relations: ['referral']
            });
            res.json(documents);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch document references',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getDocumentReferenceById(req: Request, res: Response) {
        try {
            const document = await this.repository.findOne({
                where: { document_id: req.params.id },
                relations: ['referral']
            });
            
            if (!document) {
                return res.status(404).json({ error: 'Document reference not found' });
            }
            
            res.json(document);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch document reference',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async updateDocumentReference(req: Request, res: Response) {
        try {
            const document = await this.repository.findOneBy({ document_id: req.params.id });
            
            if (!document) {
                return res.status(404).json({ error: 'Document reference not found' });
            }

            this.repository.merge(document, req.body);
            const updatedDocument = await this.repository.save(document);
            res.json(updatedDocument);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to update document reference',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async deleteDocumentReference(req: Request, res: Response) {
        try {
            const result = await this.repository.delete(req.params.id);
            
            if (result.affected === 0) {
                return res.status(404).json({ error: 'Document reference not found' });
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: 'Failed to delete document reference',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
