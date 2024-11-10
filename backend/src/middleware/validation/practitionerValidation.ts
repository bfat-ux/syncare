import { body, param } from 'express-validator';
import { validateRequest } from './validateRequest';

export const createPractitionerValidation = [
    body('first_name')
        .notEmpty()
        .withMessage('First name is required')
        .isString()
        .withMessage('First name must be a string'),
    
    body('last_name')
        .notEmpty()
        .withMessage('Last name is required')
        .isString()
        .withMessage('Last name must be a string'),
    
    body('specialization')
        .optional()
        .isString()
        .withMessage('Specialization must be a string'),
    
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
    
    validateRequest,


    body('specialty')
        .optional()
        .isString()
        .withMessage('Specialty must be a string')
        .isLength({ min: 2, max: 100 })
        .withMessage('Specialty must be between 2 and 100 characters'),

    body('contact_info.address')
        .optional()
        .isObject()
        .withMessage('Address must be an object'),

    body('contact_info.address.state')
        .optional()
        .isString()
        .withMessage('State must be a string')
        .isIn(['Lagos', 'Abuja', /* add other Nigerian states */])
        .withMessage('Invalid Nigerian state'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),

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
