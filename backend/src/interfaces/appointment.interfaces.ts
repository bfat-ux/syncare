export interface AppointmentParticipant {
    participant_type: 'patient' | 'practitioner' | 'related-person' | 'device';
    actor_id: string;
    required: 'required' | 'optional' | 'information-only';
    status: 'accepted' | 'declined' | 'tentative' | 'needs-action';
}

export interface AppointmentDetails {
    location: string;
    notes: string;
    priority: number;
    reason_code?: string;
    reason_description?: string;
    service_category?: string;
    specialty?: string;
    cancellation_reason?: string;
}