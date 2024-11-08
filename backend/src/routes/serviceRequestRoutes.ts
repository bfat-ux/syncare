import express, { Router, Request, Response } from 'express';
import {
    createServiceRequest,
    getAllServiceRequests,
    getServiceRequestById,
    updateServiceRequest,
    deleteServiceRequest
} from '../controllers/serviceRequestController';

const router: Router = express.Router();

router.post('/', createServiceRequest);
router.get('/', async (req: Request, res: Response) => {
    await getAllServiceRequests(req, res);
});
router.get('/:id', async (req: Request, res: Response) => {
    await getServiceRequestById(req, res);
});
router.put('/:id', async (req: Request, res: Response) => {
    await updateServiceRequest(req, res);
});
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteServiceRequest(req, res);
});

export default router;