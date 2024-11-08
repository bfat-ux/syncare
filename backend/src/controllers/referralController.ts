import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Referral } from '../models/Referral';

export const createReferral = async (req: Request, res: Response): Promise<void> => {
    try {
        const referralRepository = AppDataSource.getRepository(Referral);
        const referral = referralRepository.create(req.body);
        const savedReferral = await referralRepository.save(referral);
        res.status(201).json(savedReferral);
    } catch (error) {
        console.error('Error in createReferral:', error);
        res.status(500).json({
            error: 'Failed to create referral',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getReferralById = async (req: Request, res: Response): Promise<void> => {
    try {
        const referralRepository = AppDataSource.getRepository(Referral);
        const referral = await referralRepository.findOne({
            where: { referral_id: req.params.id },
            relations: ['patient']
        });
        
        if (!referral) {
            res.status(404).json({ error: 'Referral not found' });
            return;
        }
        
        res.json(referral);
    } catch (error) {
        console.error('Error in getReferralById:', error);
        res.status(500).json({
            error: 'Failed to get referral',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getAllReferrals = async (req: Request, res: Response): Promise<void> => {
    try {
        const referralRepository = AppDataSource.getRepository(Referral);
        const referrals = await referralRepository.find({
            relations: ['patient']
        });
        res.json(referrals);
    } catch (error) {
        console.error('Error in getAllReferrals:', error);
        res.status(500).json({
            error: 'Failed to fetch referrals',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const updateReferral = async (req: Request, res: Response): Promise<void> => {
    try {
        const referralRepository = AppDataSource.getRepository(Referral);
        const referral = await referralRepository.findOneBy({ referral_id: req.params.id });
        
        if (!referral) {
            res.status(404).json({ error: 'Referral not found' });
            return;
        }
        
        referralRepository.merge(referral, req.body);
        const updatedReferral = await referralRepository.save(referral);
        res.json(updatedReferral);
    } catch (error) {
        console.error('Error in updateReferral:', error);
        res.status(500).json({
            error: 'Failed to update referral',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};