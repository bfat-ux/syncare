import express, { Router, RequestHandler, Request, Response, NextFunction } from 'express';
import { PractitionerRoleController } from '../controllers/practitionerRoleController';
import { createPractitionerRoleValidation, updatePractitionerRoleValidation } from '../middleware/validation/practitionerRoleValidation';
import { validateFHIRPractitionerRole } from '../middleware/validation/fhirValidation';

const router: Router = express.Router();
const practitionerRoleController = new PractitionerRoleController();

router.post('/', 
    (createPractitionerRoleValidation as unknown as RequestHandler[]),
    (validateFHIRPractitionerRole as RequestHandler),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await practitionerRoleController.createPractitionerRole(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', async (req, res) => {
    await practitionerRoleController.getAllPractitionerRoles(req, res);
});

router.get('/:id', async (req, res) => {
    await practitionerRoleController.getPractitionerRoleById(req, res);
});

router.put('/:id',
    (updatePractitionerRoleValidation as unknown as RequestHandler[]),
    (validateFHIRPractitionerRole as RequestHandler),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await practitionerRoleController.updatePractitionerRole(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', async (req, res) => {
    await practitionerRoleController.deletePractitionerRole(req, res);
});

export default router;