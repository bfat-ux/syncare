import { body, ValidationChain } from 'express-validator';

export const createDocumentReferenceValidation: ValidationChain[] = [
    body('referral_id')
        .notEmpty()
        .withMessage('Referral ID is required')
        .isUUID()
        .withMessage('Invalid referral ID format'),
    
    body('metadata')
        .notEmpty()
        .withMessage('Metadata is required')
        .isObject()
        .withMessage('Metadata must be an object'),
    
    body('metadata.title')
        .notEmpty()
        .withMessage('Document title is required')
        .isString()
        .withMessage('Title must be a string'),
    
    body('metadata.document_type')
        .notEmpty()
        .withMessage('Document type is required')
        .isIn(['lab_result', 'imaging', 'prescription', 'clinical_note', 'other'])
        .withMessage('Invalid document type'),
    
    body('metadata.mime_type')
        .notEmpty()
        .withMessage('MIME type is required')
        .isString()
        .withMessage('MIME type must be a string'),
    
    body('storage_path')
        .notEmpty()
        .withMessage('Storage path is required')
        .isString()
        .withMessage('Storage path must be a string'),
    
    body('document_date')
        .optional()
        .isISO8601()
        .withMessage('Invalid document date format'),
    
    body('period_start')
        .optional()
        .isISO8601()
        .withMessage('Invalid period start date format'),
    
    body('period_end')
        .optional()
        .isISO8601()
        .withMessage('Invalid period end date format')
        .custom((endDate, { req }) => {
            if (req.body.period_start && endDate) {
                return new Date(endDate) >= new Date(req.body.period_start);
            }
            return true;
        })
        .withMessage('Period end date must be after period start date')
];

export const updateDocumentReferenceValidation: ValidationChain[] = [
    body('metadata')
        .optional()
        .isObject()
        .withMessage('Metadata must be an object'),
    
    body('metadata.title')
        .optional()
        .isString()
        .withMessage('Title must be a string'),
    
    body('metadata.document_type')
        .optional()
        .isIn(['lab_result', 'imaging', 'prescription', 'clinical_note', 'other'])
        .withMessage('Invalid document type'),
    
    body('status')
        .optional()
        .isIn(['current', 'superseded', 'entered-in-error'])
        .withMessage('Invalid status'),
    
    body('document_date')
        .optional()
        .isISO8601()
        .withMessage('Invalid document date format')
];
