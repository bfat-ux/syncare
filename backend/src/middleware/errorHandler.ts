import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors/AppError';
import { validationResult } from 'express-validator';
import { QueryFailedError } from 'typeorm';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Log error for debugging
    console.error('Error:', {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    // Handle AppError instances
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            errors: err instanceof ValidationError ? err.errors : undefined
        });
        return;
    }

    // Handle Express Validator Errors
    if (Array.isArray(err) && err.length > 0 && 'msg' in err[0]) {
        res.status(400).json({
            status: 'fail',
            message: 'Validation error',
            errors: err.map(e => ({
                field: e.param,
                message: e.msg
            }))
        });
        return;
    }

    // Handle TypeORM Errors
    if (err instanceof QueryFailedError) {
        if (err.message.includes('duplicate key')) {
            res.status(409).json({
                status: 'fail',
                message: 'Duplicate entry',
                error: err.message
            });
            return;
        }
        res.status(400).json({
            status: 'fail',
            message: 'Database error',
            error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
        });
        return;
    }

    // Handle all other errors
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
};
