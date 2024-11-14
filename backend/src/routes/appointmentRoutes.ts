import express from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment
} from '../controllers/appointmentController';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.patch('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

export default router;