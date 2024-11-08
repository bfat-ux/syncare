import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Appointment } from '../models/Appointment';

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointment = appointmentRepository.create(req.body);
        const savedAppointment = await appointmentRepository.save(appointment);
        
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.error('Error in createAppointment:', error);
        res.status(500).json({
            error: 'Failed to create appointment',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointments = await appointmentRepository.find({
            relations: ['patient', 'provider']
        });
        res.json(appointments);
    } catch (error) {
        console.error('Error in getAllAppointments:', error);
        res.status(500).json({
            error: 'Failed to fetch appointments',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointment = await appointmentRepository.findOne({
            where: { appointment_id: req.params.id },
            relations: ['patient', 'provider']
        });
        
        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }
        
        res.json(appointment);
    } catch (error) {
        console.error('Error in getAppointmentById:', error);
        res.status(500).json({
            error: 'Failed to get appointment',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointment = await appointmentRepository.findOneBy({ 
            appointment_id: req.params.id 
        });
        
        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }
        
        appointmentRepository.merge(appointment, req.body);
        const updatedAppointment = await appointmentRepository.save(appointment);
        res.json(updatedAppointment);
    } catch (error) {
        console.error('Error in updateAppointment:', error);
        res.status(500).json({
            error: 'Failed to update appointment',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointment = await appointmentRepository.findOneBy({ 
            appointment_id: req.params.id 
        });
        
        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }
        
        appointment.appointment_status = 'cancelled';
        await appointmentRepository.save(appointment);
        res.json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        console.error('Error in deleteAppointment:', error);
        res.status(500).json({
            error: 'Failed to cancel appointment',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
