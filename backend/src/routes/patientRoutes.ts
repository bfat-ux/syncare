import express, { Router } from 'express';
import { createPatient, getPatientById, updatePatient, deletePatient, getAllPatients } from '../controllers/patientController';

const router: Router = express.Router();

router.get('/patients', getAllPatients);
router.post('/patients', createPatient);
router.get('/patients/:id', getPatientById);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;
