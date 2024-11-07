import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm";
import { Patient } from "./Patient";

// Define interfaces for complex types
interface ReferringProvider {
    name: string;
    role: 'doctor' | 'nurse' | 'community-health-worker' | 'pharmacist' | 'patent-medicine-vendor';
    facility_name: string;
    facility_type: 'hospital' | 'clinic' | 'pharmacy' | 'patent-medicine-store' | 'community-health-center';
    contact_info: {
        phone: string;
        email?: string;
        address: {
            line: string[];
            city?: string;
            state: string;
            lga?: string;
            country: string;
        };
    };
    license_number?: string;
}

interface ClinicalInformation {
    chief_complaint: string;
    presenting_problems: string[];
    vital_signs?: {
        blood_pressure?: string;
        temperature?: string;
        pulse_rate?: string;
        respiratory_rate?: string;
        oxygen_saturation?: string;
    };
    current_medications?: string[];
    allergies?: string[];
    provisional_diagnosis?: string;
    investigations_done?: string[];
    treatments_given?: string[];
}

interface ReferralReason {
    primary_reason: string;
    urgency: 'emergency' | 'urgent' | 'routine';
    specific_service_requested?: string[];
    additional_notes?: string;
}

interface AttachmentInfo {
    title: string;
    type: 'lab_result' | 'imaging' | 'prescription' | 'clinical_note' | 'other';
    file_type: 'pdf' | 'image' | 'text';
    description?: string;
    document_date?: Date;
}

@Entity('referrals')
export class Referral {
    @PrimaryGeneratedColumn('uuid')
    referral_id!: string;

    @Column('uuid', { nullable: true })
    patient_id?: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient?: Patient;

    @Column('jsonb')
    patient_details!: {
        first_name: string;
        last_name: string;
        date_of_birth?: Date;
        gender?: string;
        phone?: string;
    };

    @Column('jsonb')
    referring_provider!: ReferringProvider;

    @Column('jsonb')
    clinical_information!: ClinicalInformation;

    @Column('jsonb')
    referral_reason!: ReferralReason;

    @Column({
        type: 'enum',
        enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
        default: 'pending'
    })
    status!: string;

    @Column({ type: 'timestamp' })
    referral_date!: Date;

    @Column({ nullable: true })
    preferred_appointment_date?: Date;

    @Column({ type: 'text', nullable: true })
    feedback_notes?: string;

    @Column('jsonb', { nullable: true })
    attachments!: AttachmentInfo[];

    // Use type-only import for the relation
    @OneToMany('DocumentReference', 'referral')
    documents?: any[];  // Type will be inferred from the relation

    constructor() {
        this.referral_date = new Date();
        this.status = 'pending';
        
        // Initialize required complex objects
        this.patient_details = {
            first_name: '',
            last_name: ''
        };
        
        this.referring_provider = {
            name: '',
            role: 'doctor',
            facility_name: '',
            facility_type: 'hospital',
            contact_info: {
                phone: '',
                address: {
                    line: [],
                    state: '',
                    country: 'Nigeria'
                }
            }
        };

        this.clinical_information = {
            chief_complaint: '',
            presenting_problems: []
        };

        this.referral_reason = {
            primary_reason: '',
            urgency: 'routine'
        };

        this.attachments = [];
    }

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column('uuid', { nullable: true })
    created_by?: string;

    @Column('uuid', { nullable: true })
    updated_by?: string;
} 