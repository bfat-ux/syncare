export interface PatientResponse {
    success: boolean;
    patient_id: string;
    message: string;
}

export interface Patient {
    patient_id: string;
    first_name: string;
    last_name: string;
    contact_info: {
        email: string;
        phone: string;
    };
    gender: string;
    birth_date: string | null;
    status: string;
} 