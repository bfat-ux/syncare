import express, { Router, Request, Response } from 'express';
import {
    createPractitioner,
    getAllPractitioners,
    getPractitionerById,
    updatePractitioner,
    deletePractitioner
} from '../controllers/practitionerController';

const router: Router = express.Router();

// CRUD routes for practitioners
router.post('/', async (req: Request, res: Response) => {
    try {
        await createPractitioner(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        await getAllPractitioners(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        await getPractitionerById(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await updatePractitioner(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await deletePractitioner(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;