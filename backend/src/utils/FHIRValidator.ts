export class FHIRValidator {
    // ... existing methods ...

    static validatePractitioner(data: any): string[] {
        const errors: string[] = [];

        // Required fields according to FHIR R4
        if (!data.name || !Array.isArray(data.name) || data.name.length === 0) {
            errors.push('At least one name is required');
        } else {
            data.name.forEach((name: any, index: number) => {
                if (!name.given || !Array.isArray(name.given) || name.given.length === 0) {
                    errors.push(`Given name is required for name at index ${index}`);
                }
                if (!name.family) {
                    errors.push(`Family name is required for name at index ${index}`);
                }
            });
        }

        // Validate identifier if present
        if (data.identifier && Array.isArray(data.identifier)) {
            data.identifier.forEach((id: any, index: number) => {
                if (!id.system) {
                    errors.push(`Identifier system is required at index ${index}`);
                }
                if (!id.value) {
                    errors.push(`Identifier value is required at index ${index}`);
                }
            });
        }

        // Validate telecom if present
        if (data.telecom && Array.isArray(data.telecom)) {
            data.telecom.forEach((telecom: any, index: number) => {
                if (!telecom.system) {
                    errors.push(`Telecom system is required at index ${index}`);
                }
                if (!telecom.value) {
                    errors.push(`Telecom value is required at index ${index}`);
                }
                if (telecom.system && !['phone', 'email', 'fax', 'pager', 'url', 'sms', 'other'].includes(telecom.system)) {
                    errors.push(`Invalid telecom system at index ${index}`);
                }
            });
        }

        // Validate qualification if present
        if (data.qualification && Array.isArray(data.qualification)) {
            data.qualification.forEach((qual: any, index: number) => {
                if (!qual.code) {
                    errors.push(`Qualification code is required at index ${index}`);
                }
                if (qual.period) {
                    if (qual.period.start && !this.isValidDate(qual.period.start)) {
                        errors.push(`Invalid qualification start date at index ${index}`);
                    }
                    if (qual.period.end && !this.isValidDate(qual.period.end)) {
                        errors.push(`Invalid qualification end date at index ${index}`);
                    }
                }
            });
        }

        return errors;
    }

    static validatePractitionerRole(data: any): string[] {
        const errors: string[] = [];

        // Required fields according to FHIR R4
        if (!data.practitioner) {
            errors.push('Practitioner reference is required');
        }

        if (!data.code || !Array.isArray(data.code)) {
            errors.push('At least one role code is required');
        }

        // Validate organization reference if present
        if (data.organization && !this.isValidReference(data.organization, 'Organization')) {
            errors.push('Invalid organization reference');
        }

        // Validate period if present
        if (data.period) {
            if (data.period.start && !this.isValidDate(data.period.start)) {
                errors.push('Invalid period start date');
            }
            if (data.period.end && !this.isValidDate(data.period.end)) {
                errors.push('Invalid period end date');
            }
            if (data.period.start && data.period.end && 
                new Date(data.period.end) < new Date(data.period.start)) {
                errors.push('Period end date must be after start date');
            }
        }

        // Validate location references if present
        if (data.location && Array.isArray(data.location)) {
            data.location.forEach((loc: any, index: number) => {
                if (!this.isValidReference(loc, 'Location')) {
                    errors.push(`Invalid location reference at index ${index}`);
                }
            });
        }

        return errors;
    }

    static validateDocumentReference(data: any): string[] {
        const errors: string[] = [];

        // Required fields according to FHIR R4
        if (!data.status) {
            errors.push('Status is required');
        } else if (!['current', 'superseded', 'entered-in-error'].includes(data.status)) {
            errors.push('Invalid status value');
        }

        if (!data.type) {
            errors.push('Document type is required');
        }

        if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
            errors.push('At least one content element is required');
        } else {
            data.content.forEach((content: any, index: number) => {
                if (!content.attachment) {
                    errors.push(`Content at index ${index} must have an attachment`);
                }
                if (!content.attachment.contentType) {
                    errors.push(`Content at index ${index} must specify a contentType`);
                }
            });
        }

        // Validate subject reference if present
        if (data.subject && !this.isValidReference(data.subject, 'Patient')) {
            errors.push('Invalid subject reference');
        }

        // Validate author references if present
        if (data.author && Array.isArray(data.author)) {
            data.author.forEach((author: any, index: number) => {
                if (!this.isValidReference(author, 'Practitioner')) {
                    errors.push(`Invalid author reference at index ${index}`);
                }
            });
        }

        // Validate date if present
        if (data.date && !this.isValidDate(data.date)) {
            errors.push('Invalid document date');
        }

        return errors;
    }

    private static isValidReference(reference: any, resourceType: string): boolean {
        return reference && 
               typeof reference === 'object' && 
               reference.reference && 
               typeof reference.reference === 'string' &&
               reference.reference.startsWith(`${resourceType}/`);
    }

    private static isValidDate(date: string): boolean {
        const d = new Date(date);
        return d instanceof Date && !isNaN(d.getTime());
    }
}
