import { body, param } from 'express-validator';
import { validateRequest } from './validateRequest';

export const createPractitionerValidation = [
    body('name')
        .isArray()
        .withMessage('Name must be an array')
        .notEmpty()
        .withMessage('At least one name is required'),
    
    body('name.*.family')
        .isString()
        .withMessage('Family name must be a string')
        .notEmpty()
        .withMessage('Family name is required'),
    
    body('name.*.given')
        .isArray()
        .withMessage('Given names must be an array')
        .notEmpty()
        .withMessage('At least one given name is required'),
    
    body('license_number')
        .notEmpty()
        .withMessage('License number is required')
        .isString()
        .withMessage('License number must be a string'),
    
    body('contact_info.email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    
    body('contact_info.phone')
        .optional()
        .matches(/^\+?[\d\s-]+$/)
        .withMessage('Invalid phone number format'),
    
    validateRequest
];

export const updatePractitionerValidation = [
    param('id')
        .isUUID()
        .withMessage('Invalid practitioner ID'),
    
    body('first_name')
        .optional()
        .isString()
        .withMessage('First name must be a string'),
    
    body('last_name')
        .optional()
        .isString()
        .withMessage('Last name must be a string'),
    
    body('specialization')
        .optional()
        .isString()
        .withMessage('Specialization must be a string'),
    
    body('license_number')
        .optional()
        .isString()
        .withMessage('License number must be a string'),
    
    body('contact_info.email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    
    body('contact_info.phone')
        .optional()
        .matches(/^\+?[\d\s-]+$/)
        .withMessage('Invalid phone number format'),
    
    validateRequest
];
