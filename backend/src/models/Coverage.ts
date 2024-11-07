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

interface InsuranceDetails {
    provider_type: 'NHIS' | 'CBHI' | 'private' | 'donor' | 'government';
    provider_name: string;
    policy_number?: string;
    plan_type?: string;
    hmo_name?: string;
    network_restrictions?: string[];
}

interface BenefitPackage {
    name: string;
    description?: string;
    services_covered: string[];
    exclusions?: string[];
    caps_and_limits?: {
        service_type: string;
        limit_amount?: number;
        limit_period?: string;
        remaining_balance?: number;
    }[];
}

interface CommunityScheme {
    community_name: string;
    scheme_name: string;
    premium_amount: number;
    payment_frequency: 'monthly' | 'quarterly' | 'annually';
    copay_structure?: {
        service_type: string;
        copay_amount: number;
        copay_percentage?: number;
    }[];
}

@Entity('coverages')
export class Coverage {
    @PrimaryGeneratedColumn('uuid')
    coverage_id!: string;

    @Column('uuid')
    patient_id!: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient!: Patient;

    @Column({
        type: 'enum',
        enum: ['active', 'cancelled', 'draft', 'inactive'],
        default: 'active'
    })
    status!: string;

    @Column('jsonb')
    insurance_details!: InsuranceDetails;

    @Column('jsonb', { nullable: true })
    benefit_package!: BenefitPackage;

    @Column('jsonb', { nullable: true })
    community_scheme?: CommunityScheme;

    @Column({ type: 'timestamp' })
    start_date!: Date;

    @Column({ type: 'timestamp', nullable: true })
    end_date?: Date;

    @Column({ nullable: true })
    sponsor_type?: 'self' | 'employer' | 'government' | 'donor' | 'family';

    @Column('jsonb', { nullable: true })
    eligibility_rules?: {
        criteria: string[];
        verification_method?: string;
        last_verified_date?: Date;
    };

    @Column('jsonb', { nullable: true })
    subsidy_information?: {
        program_name: string;
        sponsor_name: string;
        coverage_percentage: number;
        conditions?: string[];
        valid_until?: Date;
    }[];

    constructor() {
        this.status = 'active';
        this.start_date = new Date();
        
        // Initialize required objects
        this.insurance_details = {
            provider_type: 'NHIS',
            provider_name: '',
            plan_type: ''
        };

        this.benefit_package = {
            name: '',
            services_covered: []
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
