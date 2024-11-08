import express, { Router } from 'express';
import { createPatient, getPatientById, updatePatient, deletePatient, getAllPatients } from '../controllers/patientController';

const router: Router = express.Router();

router.get('/', getAllPatients);
router.post('/', createPatient);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;
