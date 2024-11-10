import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.type === 'field' ? error.path : error.type,
                value: error.type === 'field' ? error.value : null,
                message: error.msg
            }))
        });
    }
    next();
};