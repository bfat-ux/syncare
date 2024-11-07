import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
} from "typeorm";

// Define interfaces for all complex types
interface ContactInfo {
    phone?: string;
    email?: string;
    address?: {
        line: string[];
        city?: string;
        state: string;
        lga?: string;
        postal_code?: string;
        country: string;
    };
}

interface Condition {
    code: string;
    system: string;
    display: string;
    onset_date: Date;
    status: string;
}

interface MedicalHistory {
    condition: Condition[];
}

interface Vaccine {
    code: string;
    system: string;
    display: string;
    date: Date;
    status: string;
}

interface ImmunizationRecords {
    vaccine: Vaccine[];
}

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    patient_id!: string;

    @Column({ nullable: true })
    first_name!: string;

    @Column({ nullable: true })
    last_name!: string;

    @Column({ type: 'date', nullable: true })
    date_of_birth!: Date;

    @Column({
        type: 'enum',
        enum: ['male', 'female', 'other', 'unknown'],
        nullable: true
    })
    gender!: string;

    @Column('jsonb', { nullable: true })
    contact_info!: ContactInfo;

    @Column('jsonb', { nullable: true })
    medical_history!: MedicalHistory;

    @Column('jsonb', { nullable: true })
    immunization_records!: ImmunizationRecords;

    constructor() {
        this.first_name = '';
        this.last_name = '';
        this.date_of_birth = new Date();
        this.gender = 'unknown';
        this.contact_info = {};
        this.medical_history = { condition: [] };
        this.immunization_records = { vaccine: [] };
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
