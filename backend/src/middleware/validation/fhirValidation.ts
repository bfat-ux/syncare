import { Request, Response, NextFunction } from 'express';
import { FHIRValidator } from '../../utils/FHIRValidator';

// Existing validation
export const validateFHIRPractitioner = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = FHIRValidator.validatePractitioner(req.body);
    
    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'FHIR validation failed',
            errors
        });
    }
    
    next();
};

// New validations
export const validateFHIRPractitionerRole = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = FHIRValidator.validatePractitionerRole(req.body);
    
    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'FHIR validation failed',
            errors
        });
    }
    
    next();
};

export const validateFHIRDocumentReference = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = FHIRValidator.validateDocumentReference(req.body);
    
    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'FHIR validation failed',
            errors
        });
    }
    
    next();
};