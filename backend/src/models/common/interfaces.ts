// Common interfaces that can be reused across entities
export interface Address {
    line: string[];          // Street address, landmarks
    city?: string;          // Made optional
    state: string;          // Required as states are well-defined in Nigeria
    postal_code?: string;   // Made optional as not commonly used
    lga?: string;          // Added Local Government Area
    country: string;        // Default to 'Nigeria'
}

export interface ContactInfo {
    phone?: string;
    email?: string;
    address?: Address;
}