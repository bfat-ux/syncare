import express from 'express';
import patientRoutes from './patientRoutes';
import appointmentRoutes from './appointmentRoutes';
import practitionerRoutes from './practitionerRoutes';
import serviceRequestRoutes from './serviceRequestRoutes';
import referralRoutes from './referralRoutes';

const router = express.Router();

router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/practitioners', practitionerRoutes);
router.use('/service-requests', serviceRequestRoutes);
router.use('/referrals', referralRoutes);

export default router;