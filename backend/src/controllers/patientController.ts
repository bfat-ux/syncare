import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Patient } from '../models/Patient';

// Create a new patient
export const createPatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const patientRepository = AppDataSource.getRepository(Patient);
        
        // Log incoming data
        console.log('Creating patient with data:', req.body);
        
        // Create and save patient
        const patient = patientRepository.create(req.body);
        const savedPatient = await patientRepository.save(patient);
        
        console.log('Patient created successfully:', savedPatient);
        res.status(201).json(savedPatient);
    } catch (error) {
        console.error('Error in createPatient:', error);
        res.status(500).json({
            error: 'Failed to create patient',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get patient by ID
export const getPatientById = async (req: Request, res: Response): Promise<void> => {
    try {
        const patientRepository = AppDataSource.getRepository(Patient);
        const patient = await patientRepository.findOneBy({ patient_id: req.params.id });
        
        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }
        
        res.json(patient);
    } catch (error) {
        console.error('Error in getPatientById:', error);
        res.status(500).json({
            error: 'Failed to get patient',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Update patient information
export const updatePatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const patientId = req.params.id;
        const patientRepository = AppDataSource.getRepository(Patient);
        const patient = await patientRepository.findOne({ where: { patient_id: patientId } });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        // Update patient properties from req.body
        Object.assign(patient, req.body);

        const updatedPatient = await patientRepository.save(patient);
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update patient' });
    }
};

// Deactivate patient record
export const deletePatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const patientId = req.params.id;
        const patientRepository = AppDataSource.getRepository(Patient);
        const patient = await patientRepository.findOne({ where: { patient_id: patientId } });

        if (!patient) {
            res.status(404).json({ error: 'Patient not found' });
            return;
        }

        // Update the patient's active status
        patient.isActive = false;
        await patientRepository.save(patient);

        res.status(200).json({ message: 'Patient deactivated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to deactivate patient' });
    }
};

// Add this new function to get all patients
export const getAllPatients = async (req: Request, res: Response): Promise<void> => {
    try {
        const patientRepository = AppDataSource.getRepository(Patient);
        const patients = await patientRepository.find({
            order: {
                created_at: 'DESC'
            }
        });
        
        // Set proper content type and formatting
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(patients, null, 2));
    } catch (error) {
        console.error('Error in getAllPatients:', error);
        res.status(500).json({
            error: 'Failed to fetch patients',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
