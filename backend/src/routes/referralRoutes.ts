import express, { Router } from 'express';
import {
    createReferral,
    getAllReferrals,
    getReferralById,
    updateReferral
} from '../controllers/referralController';

const router: Router = express.Router();

router.post('/', createReferral);
router.get('/', getAllReferrals);
router.get('/:id', getReferralById);
router.put('/:id', updateReferral);

export default router;