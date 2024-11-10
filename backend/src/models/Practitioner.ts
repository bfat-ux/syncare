import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToMany
} from "typeorm";

// Define interfaces for complex types
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

interface Credential {
    type: string;           // degree, certification, license
    number?: string;        // license/certification number
    issuer: string;        // issuing organization
    issued_date: Date;
    expiry_date?: Date;
    status: 'active' | 'inactive' | 'expired' | 'revoked';
    verification_url?: string;
}

interface Qualification {
    specialty: string;
    qualification: string;
    period: {
        start: Date;
        end?: Date;
    };
    issuer?: string;
}

@Entity('practitioners')
export class Practitioner {
    @PrimaryGeneratedColumn('uuid')
    practitioner_id!: string;

    @Column({ nullable: true })
    first_name!: string;

    @Column({ nullable: true })
    last_name!: string;

    @Column({
        type: 'enum',
        enum: ['doctor', 'nurse', 'therapist', 'specialist', 'admin'],
        nullable: true
    })
    user_role!: string;

    @Column({ nullable: true })
    specialty!: string;

    @Column('jsonb', { nullable: true })
    contact_info!: ContactInfo;

    @Column('jsonb', { nullable: true })
    credentials!: Credential[];

    @Column('jsonb', { nullable: true })
    qualifications!: Qualification[];

    @Column({ select: false })  // This ensures the password isn't selected by default
    user_password!: string;

    @Column({
        type: 'enum',
        enum: ['active', 'inactive', 'suspended', 'retired'],
        default: 'active'
    })
    status!: string;

    @Column('jsonb', { nullable: true })
    availability?: {
        days: string[];
        hours: {
            start: string;
            end: string;
        }[];
        exceptions?: {
            date: Date;
            reason: string;
        }[];
    };

    @Column({ default: true })
    isActive!: boolean;

    constructor() {
        // Initialize basic fields
        this.first_name = '';
        this.last_name = '';
        this.user_role = 'doctor';
        this.specialty = '';
        this.status = 'active';
        this.user_password = '';  // Should be hashed before saving

        // Initialize complex objects
        this.contact_info = {
            address: {
                line: [],
                state: '',
                country: 'Nigeria'  // Default to Nigeria
            }
        };
        this.credentials = [];
        this.qualifications = [];
        this.availability = {
            days: [],
            hours: [],
            exceptions: []
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
