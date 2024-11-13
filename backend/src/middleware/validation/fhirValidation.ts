import { Request, Response, NextFunction } from 'express';
import { Practitioner } from '../../models/Practitioner';

interface FHIRValidationError {
    field: string;
    message: string;
}

export class FHIRValidator {
    static validatePractitioner(data: Partial<Practitioner>): FHIRValidationError[] {
        const errors: FHIRValidationError[] = [];

        // Validate identifier (license number)
        if (data.license_number) {
            if (!this.isValidIdentifier(data.license_number)) {
                errors.push({
                    field: 'license_number',
                    message: 'Invalid license number format'
                });
            }
        }

        // Validate name structure
        if (data.first_name || data.last_name) {
            const nameErrors = this.validateHumanName(data.first_name, data.last_name);
            errors.push(...nameErrors);
        }

        // Validate contact information
        if (data.contact_info) {
            const contactErrors = this.validateContactPoint(data.contact_info);
            errors.push(...contactErrors);
        }

        return errors;
    }

    private static isValidIdentifier(identifier: string): boolean {
        // Nigerian Medical License format validation
        const nigerianLicensePattern = /^[A-Z]{2}\d{6}$/;
        return nigerianLicensePattern.test(identifier);
    }

    private static validateHumanName(firstName?: string, lastName?: string): FHIRValidationError[] {
        const errors: FHIRValidationError[] = [];
        
        if (firstName && firstName.length < 2) {
            errors.push({
                field: 'first_name',
                message: 'First name must be at least 2 characters long'
            });
        }

        if (lastName && lastName.length < 2) {
            errors.push({
                field: 'last_name',
                message: 'Last name must be at least 2 characters long'
            });
        }

        return errors;
    }

    private static validateContactPoint(contactInfo: any): FHIRValidationError[] {
        const errors: FHIRValidationError[] = [];

        if (contactInfo.phone && !this.isValidNigerianPhone(contactInfo.phone)) {
            errors.push({
                field: 'contact_info.phone',
                message: 'Invalid Nigerian phone number format'
            });
        }

        if (contactInfo.email && !this.isValidEmail(contactInfo.email)) {
            errors.push({
                field: 'contact_info.email',
                message: 'Invalid email format'
            });
        }

        return errors;
    }

    private static isValidNigerianPhone(phone: string): boolean {
        const phonePattern = /^(\+234|0)[789][01]\d{8}$/;
        return phonePattern.test(phone);
    }

    private static isValidEmail(email: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
}

// Middleware to apply FHIR validation
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