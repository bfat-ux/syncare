import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Patient } from "./Patient";

// Define interfaces for complex types
interface AppointmentParticipant {
    actor: {
        reference: string;  // UUID of the practitioner/provider
        display: string;    // Name or title of the practitioner
        role?: string;     // Role in this appointment
    };
    required: boolean;
    status: 'accepted' | 'declined' | 'tentative' | 'needs-action';
}

interface AppointmentDetails {
    location?: string;
    notes?: string;
    reason_code?: string;
    specialty?: string;
    priority?: number;
    comment?: string;
}

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    appointment_id!: string;

    @Column('uuid')
    patient_id!: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient!: Patient;

    @Column('uuid', { nullable: true })
    provider_id!: string;

    @Column({ type: 'timestamp' })
    appointment_date!: Date;

    @Column({ type: 'timestamp' })
    start_time!: Date;

    @Column({ type: 'timestamp' })
    end_time!: Date;

    @Column({
        type: 'enum',
        enum: ['scheduled', 'pending', 'arrived', 'fulfilled', 'cancelled', 'no-show'],
        default: 'scheduled'
    })
    appointment_status!: string;

    @Column({
        type: 'enum',
        enum: ['routine', 'urgent', 'follow-up', 'walk-in', 'emergency'],
        nullable: true
    })
    appointment_type!: string;

    @Column('jsonb', { nullable: true })
    participants!: AppointmentParticipant[];

    @Column('jsonb', { nullable: true })
    details!: AppointmentDetails;

    constructor() {
        // Initialize required fields with default values
        this.appointment_date = new Date();
        this.start_time = new Date();
        this.end_time = new Date();
        this.appointment_status = 'scheduled';
        this.appointment_type = 'routine';
        
        // Initialize complex objects
        this.participants = [];
        this.details = {
            location: '',
            notes: '',
            priority: 0
        };
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
