import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { ServiceRequest } from '../models/ServiceRequest';
import { FindOptionsWhere } from 'typeorm';

export const createServiceRequest = async (req: Request, res: Response) => {
    try {
        const serviceRequestRepository = AppDataSource.getRepository(ServiceRequest);
        const serviceRequest = serviceRequestRepository.create(req.body);
        const savedServiceRequest = await serviceRequestRepository.save(serviceRequest);
        res.status(201).json(savedServiceRequest);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create service request',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getAllServiceRequests = async (req: Request, res: Response) => {
    try {
        const serviceRequestRepository = AppDataSource.getRepository(ServiceRequest);
        const serviceRequests = await serviceRequestRepository.find();
        res.json(serviceRequests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service requests' });
    }
};

export const getServiceRequestById = async (req: Request, res: Response) => {
    try {
        const serviceRequestRepository = AppDataSource.getRepository(ServiceRequest);
        const serviceRequest = await serviceRequestRepository.findOneBy({ 
            id: parseInt(req.params.id) 
        } as FindOptionsWhere<ServiceRequest>);
        if (!serviceRequest) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.json(serviceRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service request' });
    }
};

export const updateServiceRequest = async (req: Request, res: Response) => {
    try {
        const serviceRequestRepository = AppDataSource.getRepository(ServiceRequest);
        const serviceRequest = await serviceRequestRepository.findOneBy({
            id: parseInt(req.params.id)
        } as FindOptionsWhere<ServiceRequest>);
        if (!serviceRequest) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        serviceRequestRepository.merge(serviceRequest, req.body);
        const updatedServiceRequest = await serviceRequestRepository.save(serviceRequest);
        res.json(updatedServiceRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service request' });
    }
};

export const deleteServiceRequest = async (req: Request, res: Response) => {
    try {
        const serviceRequestRepository = AppDataSource.getRepository(ServiceRequest);
        const result = await serviceRequestRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ error: 'Service request not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service request' });
    }
};