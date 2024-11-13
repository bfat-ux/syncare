import express, { Router, RequestHandler } from 'express';
import { PractitionerController } from '../controllers/practitionerController';
import { createPractitionerValidation, updatePractitionerValidation } from '../middleware/validation/practitionerValidation';
import { validateFHIRPractitioner } from '../middleware/validation/fhirValidation';

const router: Router = express.Router();
const practitionerController = new PractitionerController();

// CRUD routes for practitioners
router.post('/', 
    (createPractitionerValidation as unknown as RequestHandler[]),
    (validateFHIRPractitioner as RequestHandler),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await practitionerController.createPractitioner(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', 
    async (req: express.Request, res: express.Response) => {
        await practitionerController.getAllPractitioners(req, res);
    }
);

router.get('/:id', 
    async (req: express.Request, res: express.Response) => {
        await practitionerController.getPractitionerById(req, res);
    }
);

router.put('/:id',
    (updatePractitionerValidation as unknown as RequestHandler[]),
    (validateFHIRPractitioner as RequestHandler),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await practitionerController.updatePractitioner(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    async (req: express.Request, res: express.Response) => {
        await practitionerController.deletePractitioner(req, res);
    }
);

export default router;