import { Request, Response } from 'express';
import { AppointmentStatsService } from '../services/appointmentStatsService';

const statsService = new AppointmentStatsService();

export const getDailyStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const date = req.query.date ? new Date(req.query.date as string) : new Date();
        const stats = await statsService.getDailyStats(date);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get daily stats' });
    }
};

export const getMonthlyStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const year = parseInt(req.query.year as string) || new Date().getFullYear();
        const month = parseInt(req.query.month as string) || new Date().getMonth() + 1;
        const stats = await statsService.getMonthlyStats(year, month);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get monthly stats' });
    }
};

export const getProviderStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const { provider_id, start_date, end_date } = req.query;
        const stats = await statsService.getProviderStats(
            provider_id as string,
            new Date(start_date as string),
            new Date(end_date as string)
        );
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get provider stats' });
    }
};