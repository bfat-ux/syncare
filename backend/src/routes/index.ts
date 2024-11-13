import express from 'express';
import patientRoutes from './patientRoutes';
import appointmentRoutes from './appointmentRoutes';
import practitionerRoutes from './practitionerRoutes';
import serviceRequestRoutes from './serviceRequestRoutes';
import referralRoutes from './referralRoutes';
import practitionerRoleRoutes from './practitionerRoleRoutes';
import documentReferenceRoutes from './documentReferenceRoutes';

const router = express.Router();

router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/practitioners', practitionerRoutes);
router.use('/service-requests', serviceRequestRoutes);
router.use('/referrals', referralRoutes);
router.use('/practitioner-roles', practitionerRoleRoutes);
router.use('/document-references', documentReferenceRoutes);

export default router;