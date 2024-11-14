import express from 'express';
import {
    getDailyStats,
    getMonthlyStats,
    getProviderStats
} from '../controllers/statsController';

const router = express.Router();

router.get('/daily', getDailyStats);
router.get('/monthly', getMonthlyStats);
router.get('/provider', getProviderStats);

export default router;