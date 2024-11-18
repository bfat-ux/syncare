import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Appointment } from '../models/Appointment';
import { AppointmentValidationService } from '../services/appointmentValidationService';
import { Between, Like } from 'typeorm';

const validationService = new AppointmentValidationService();

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Received appointment request:', JSON.stringify(req.body, null, 2));

        const appointmentRepository = AppDataSource.getRepository(Appointment);
        
        // Validate required fields
        const requiredFields = ['appointment_date', 'start_time', 'end_time', 'provider_id', 'patient_id'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            res.status(400).json({
                error: 'Missing required fields',
                details: `Missing: ${missingFields.join(', ')}`
            });
            return;
        }

        // Create appointment with explicit typing
        const appointmentData: Partial<Appointment> = {
            appointment_date: new Date(req.body.appointment_date),
            start_time: new Date(req.body.start_time),
            end_time: new Date(req.body.end_time),
            provider_id: req.body.provider_id,
            patient_id: req.body.patient_id,
            appointment_status: 'scheduled',
            appointment_type: 'routine',
            details: req.body.details || {}
        };

        console.log('Processed appointment data:', appointmentData);

        const appointment = appointmentRepository.create(appointmentData);
        const savedAppointment = await appointmentRepository.save(appointment);
        
        console.log('Saved appointment:', savedAppointment);
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({
            error: 'Failed to create appointment',
            details: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
    }
};

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            date,
            provider_id,
            patient_id,
            status,
            type,
            from_date,
            to_date
        } = req.query;

        const appointmentRepository = AppDataSource.getRepository(Appointment);
        
        let whereClause: any = {};

        if (date) {
            whereClause.appointment_date = date;
        }
        if (provider_id) {
            whereClause.provider_id = provider_id;
        }
        if (patient_id) {
            whereClause.patient_id = patient_id;
        }
        if (status) {
            whereClause.appointment_status = status;
        }
        if (type) {
            whereClause.appointment_type = type;
        }
        if (from_date && to_date) {
            whereClause.appointment_date = Between(from_date, to_date);
        }

        const appointments = await appointmentRepository.find({
            where: whereClause,
            relations: ['patient'],
            order: {
                appointment_date: 'ASC',
                start_time: 'ASC'
            }
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

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointment = await appointmentRepository.findOneBy({ appointment_id: id });

        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }

        const validTransitions: { [key: string]: string[] } = {
            'scheduled': ['arrived', 'cancelled', 'no-show'],
            'arrived': ['fulfilled', 'cancelled'],
            'fulfilled': [],
            'cancelled': [],
            'no-show': []
        };

        const currentStatus = appointment.appointment_status;
        if (!validTransitions[currentStatus]?.includes(status)) {
            res.status(400).json({ 
                error: `Invalid status transition from ${currentStatus} to ${status}` 
            });
            return;
        }

        appointment.appointment_status = status;
        if (notes) {
            appointment.details = {
                ...appointment.details,
                notes: `${appointment.details?.notes || ''}\n${new Date().toISOString()}: ${notes}`
            };
        }

        const updatedAppointment = await appointmentRepository.save(appointment);
        res.json(updatedAppointment);
    } catch (error) {
        console.error('Error in updateAppointmentStatus:', error);
        res.status(500).json({
            error: 'Failed to update appointment status',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
