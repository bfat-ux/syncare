import { body } from 'express-validator';
import { validateRequest } from './validateRequest';

export const createPractitionerRoleValidation = [
    body('practitioner_id')
        .notEmpty()
        .withMessage('Practitioner ID is required')
        .isUUID()
        .withMessage('Invalid practitioner ID format'),
    
    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['doctor', 'nurse', 'therapist', 'specialist', 'admin', 'chew'])
        .withMessage('Invalid role type'),
    
    body('specialties')
        .optional()
        .isArray()
        .withMessage('Specialties must be an array')
        .custom((specialties: string[]) => {
            return specialties.every(specialty => typeof specialty === 'string');
        })
        .withMessage('Each specialty must be a string'),
    
    body('locations')
        .optional()
        .isArray()
        .withMessage('Locations must be an array')
        .custom((locations: string[]) => {
            return locations.every(location => typeof location === 'string');
        })
        .withMessage('Each location must be a string'),
    
    validateRequest
];

export const updatePractitionerRoleValidation = [
    body('role')
        .optional()
        .isIn(['doctor', 'nurse', 'therapist', 'specialist', 'admin', 'chew'])
        .withMessage('Invalid role type'),
    
    body('specialties')
        .optional()
        .isArray()
        .withMessage('Specialties must be an array')
        .custom((specialties: string[]) => {
            return specialties.every(specialty => typeof specialty === 'string');
        })
        .withMessage('Each specialty must be a string'),
    
    body('locations')
        .optional()
        .isArray()
        .withMessage('Locations must be an array')
        .custom((locations: string[]) => {
            return locations.every(location => typeof location === 'string');
        })
        .withMessage('Each location must be a string'),
    
    validateRequest
];
