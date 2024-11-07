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
interface Diagnosis {
    code: string;
    system: string;
    display: string;
    status: string;
    severity?: string;
    notes?: string;
}

interface TreatmentPlan {
    description: string;
    goals: string[];
    instructions: string;
    follow_up_date?: Date;
}

interface Prescription {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    prescribed_date: Date;
}

interface LabTest {
    test_name: string;
    test_code: string;
    status: string;
    results?: string;
    result_date?: Date;
    notes?: string;
}

interface ImagingStudy {
    study_type: string;
    body_site: string;
    status: string;
    results?: string;
    result_date?: Date;
    notes?: string;
}

@Entity('encounters')
export class Encounter {
    @PrimaryGeneratedColumn('uuid')
    encounter_id!: string;

    @Column('uuid')
    patient_id!: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient!: Patient;

    @Column('uuid', { nullable: true })
    provider_id!: string;

    @Column({ type: 'timestamp' })
    date_of_visit!: Date;

    @Column({ type: 'text', nullable: true })
    reason_for_visit!: string;

    @Column('jsonb', { nullable: true })
    diagnosis!: Diagnosis[];

    @Column('jsonb', { nullable: true })
    treatment_plan!: TreatmentPlan;

    @Column('jsonb', { nullable: true })
    prescription!: Prescription[];

    @Column('jsonb', { nullable: true })
    laboratory_tests!: LabTest[];

    @Column('jsonb', { nullable: true })
    imaging_studies!: ImagingStudy[];

    constructor() {
        this.date_of_visit = new Date();
        this.reason_for_visit = '';
        this.diagnosis = [];
        this.treatment_plan = {
            description: '',
            goals: [],
            instructions: ''
        };
        this.prescription = [];
        this.laboratory_tests = [];
        this.imaging_studies = [];
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
