import express, { Router, RequestHandler, Request, Response, NextFunction } from 'express';
import { DocumentReferenceController } from '../controllers/documentReferenceController';
import { createDocumentReferenceValidation, updateDocumentReferenceValidation } from '../middleware/validation/documentReferenceValidation';

const router: Router = express.Router();
const documentReferenceController = new DocumentReferenceController();

router.post('/', 
    ((req, res, next) => {
        const validationChain = createDocumentReferenceValidation;
        Promise.all(validationChain.map(validation => validation.run(req)))
            .then(() => next())
            .catch(next);
    }) as RequestHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await documentReferenceController.createDocumentReference(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await documentReferenceController.getAllDocumentReferences(req, res);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await documentReferenceController.getDocumentReferenceById(req, res);
});

router.put('/:id',
    ((req, res, next) => {
        const validationChain = updateDocumentReferenceValidation;
        Promise.all(validationChain.map(validation => validation.run(req)))
            .then(() => next())
            .catch(next);
    }) as RequestHandler,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await documentReferenceController.updateDocumentReference(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await documentReferenceController.deleteDocumentReference(req, res);
});

export default router;
